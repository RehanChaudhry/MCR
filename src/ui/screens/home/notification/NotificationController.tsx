import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";
import EScreen from "models/enums/EScreen";
import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { Alert } from "react-native";
import ProfileApis from "repo/auth/ProfileApis";
import { useApi } from "repo/Client";
import { HomeStackParamList } from "routes/HomeStack";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationView } from "ui/screens/home/notification/NotificationView";
import { AppLog } from "utils/Util";
import { NotificationReadApiRequestModel } from "models/api_requests/NotificationReadApiRequestModel";
import useNotification from "hooks/useNotification";
import { User } from "models/User";
import SimpleToast from "react-native-simple-toast";
import MarkRead from "assets/images/mark_read.svg";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import useNotificationsCount from "ui/screens/home/friends/useNotificationsCount";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import NotificationData from "models/NotificationData";
import _ from "lodash";

type NotificationNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ViewProfile"
>;

type Props = {};

const NotificationController: FC<Props> = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const theme = usePreferredTheme();
  const [shouldShowLoader, setShouldShowLoader] = useState(false);

  const [notifications, setNotifications] = useState<NotificationData[]>();

  const notificationApi = useApi<any, NotificationsResponseModel>(
    ProfileApis.getNotifications
  );
  const notificationReadApi = useApi<NotificationReadApiRequestModel, any>(
    ProfileApis.notificationMarkRead
  );
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const {
    notificationsCount,
    setNotificationsCount
  } = useNotificationsCount();

  const [
    paginationRequestModel,
    setPaginationRequestModel
  ] = useState<PaginationParamsModel>({
    page: 1,
    limit: 9,
    paginate: true
  });

  const openMyProfileScreen = (userId: number, userName: string) => {
    navigation.push("ViewProfile", {
      isFrom: EScreen.NOTIFICATION,
      userId: userId,
      userName: userName
    });
  };

  const handleGetNotificationApi = useCallback(
    async (
      isFromPullToRefresh: boolean,
      requestModel: PaginationParamsModel
    ) => {
      if (notificationApi.loading) {
        return;
      }
      const { hasError, dataBody } = await notificationApi.request([
        requestModel
      ]);

      if (hasError) {
        Alert.alert(
          "Unable to fetch notifications",
          "Please try again later"
        );
        return;
      }
      setNotifications((prevState) => {
        return [
          ...(!isFromPullToRefresh ? prevState ?? [] : []),
          ...dataBody!.data
        ];
      });
      setPaginationRequestModel({
        ...requestModel,
        page: (requestModel.page ?? 0) + 1
      });

      setIsAllDataLoaded(
        (dataBody?.data?.length ?? 0) < requestModel.limit!
      );
    },
    [notificationApi]
  );

  const refreshCallback = useCallback(
    async (onComplete?: () => void) => {
      if (notificationApi.loading) {
        onComplete?.();
        return;
      }

      const myFriendRequestModel: PaginationParamsModel = {
        ...paginationRequestModel,
        page: 1
      };

      setPaginationRequestModel(myFriendRequestModel);
      handleGetNotificationApi(true, myFriendRequestModel).then(() => {
        onComplete?.();
      });
    },
    [
      handleGetNotificationApi,
      notificationApi.loading,
      paginationRequestModel
    ]
  );

  const handleNotificationMarkRead = useCallback(
    async (allRead?: boolean, notificationId?: number) => {
      AppLog.logForcefully(
        () => "readnotificationApifunctioncall" + notificationId
      );
      if (allRead) {
        setShouldShowLoader(true);
      }
      const {
        hasError,
        errorBody,
        dataBody
      } = await notificationReadApi.request([
        {
          all: allRead ?? false,
          notificationId: notificationId!
        }
      ]);

      if (hasError) {
        AppLog.log(() => "Unable to read notification: " + errorBody);
        return;
      } else {
        if (allRead) {
          SimpleToast.show(dataBody?.message);
          setNotificationsCount!(0);
          setShouldShowLoader(false);
          refreshCallback().then().catch();
        } else {
          const itemCopy = _.cloneDeep(
            notifications?.find((item) => item.id === notificationId!!)
          );

          if (itemCopy) {
            itemCopy.isRead = 1;

            AppLog.logForcefully(
              () =>
                "New notifications list : " + JSON.stringify(notifications)
            );

            notifications?.splice(
              notifications?.findIndex(
                (item) => item.id === notificationId!!
              ),
              1,
              itemCopy
            );
            setNotifications(notifications);
          }
        }
        AppLog.log(() => dataBody.message);
      }
    },
    [
      notificationReadApi,
      notifications,
      refreshCallback,
      setNotificationsCount
    ]
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerStyle: { elevation: 0, shadowOpacity: 0 },
      headerTitle: () => <HeaderTitle text="Notification" />,
      headerRight: () => (
        <HeaderRightTextWithIcon
          shouldShowLoader={shouldShowLoader}
          icon={() => (
            <MarkRead
              width={23}
              height={23}
              fill={
                notificationsCount !== 0
                  ? theme.themedColors.primary
                  : theme.themedColors.interface[400]
              }
            />
          )}
          onPress={() => {
            if (notificationsCount !== 0) {
              handleNotificationMarkRead(true);
            }
          }}
        />
      )
    });
  }, [
    navigation,
    notificationsCount,
    shouldShowLoader,
    theme,
    handleNotificationMarkRead
  ]);

  const onEndReached = useCallback(() => {
    AppLog.log(() => "onEndReachedcall");
    handleGetNotificationApi(false, paginationRequestModel);
  }, [paginationRequestModel, handleGetNotificationApi]);

  const searchText = useCallback(
    (textToSearch: string) => {
      if (textToSearch === "View All") {
        const updatedRequestModel = {
          ...paginationRequestModel,
          page: 1
        };
        setPaginationRequestModel(updatedRequestModel);
        setNotifications(undefined);
        handleGetNotificationApi(false, updatedRequestModel);
      } else {
        const updatedRequestModel = {
          ...paginationRequestModel,
          page: 1,
          actionType: textToSearch
        };
        setPaginationRequestModel(updatedRequestModel);
        setNotifications(undefined);
        handleGetNotificationApi(false, updatedRequestModel);
      }
    },
    [paginationRequestModel, handleGetNotificationApi]
  );

  useEffect(() => {
    handleGetNotificationApi(false, paginationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { handleNotification } = useNotification();

  const navigateTOScreen = (
    type: string,
    postId?: number,
    action?: string,
    users?: User[],
    conversationId?: number,
    notificationId?: number,
    sender?: User
  ) => {
    handleNotificationMarkRead(false, notificationId!);
    const { screenName, params, isFeatureLocked } = handleNotification({
      type,
      postId,
      action,
      users,
      conversationId,
      notificationId,
      sender
    });

    if (isFeatureLocked) {
      navigation.navigate(screenName, {
        ...params
      });
    } else {
      SimpleToast.show("Feature turned off.");
    }
  };

  return (
    <NotificationView
      isAllDataLoaded={isAllDataLoaded}
      onEndReached={onEndReached}
      pullToRefreshCallback={refreshCallback}
      shouldShowProgressBar={notificationApi.loading}
      notifications={notifications}
      openMyProfileScreen={openMyProfileScreen}
      onChangeFilter={searchText}
      navigateToRequiredScreen={navigateTOScreen}
    />
  );
};

export default NotificationController;
