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

type NotificationNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ViewProfile"
>;

type Props = {};

const NotificationController: FC<Props> = () => {
  const navigation = useNavigation<NotificationNavigationProp>();

  const [
    notifications,
    setNotifications
  ] = useState<NotificationsResponseModel>();

  const notificationApi = useApi<any, NotificationsResponseModel>(
    ProfileApis.getNotifications
  );
  const notificationReadApi = useApi<NotificationReadApiRequestModel, any>(
    ProfileApis.notificationMarkRead
  );
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerStyle: { elevation: 0, shadowOpacity: 0 },
      headerTitle: () => <HeaderTitle text="Notification" />
    });
  }, [navigation]);

  const handleNotificationMarkRead = useCallback(
    async (notificationId: number) => {
      AppLog.logForcefully(
        () => "readnotificationApifunctioncall" + notificationId
      );
      const {
        hasError,
        errorBody,
        dataBody
      } = await notificationReadApi.request([
        {
          all: false,
          notificationId: notificationId
        }
      ]);

      if (hasError) {
        AppLog.logForcefully(
          () => "Unable to read notification: " + errorBody
        );
        return;
      } else {
        AppLog.logForcefully(() => dataBody.message);
      }
    },
    [notificationReadApi]
  );

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
        return {
          message: dataBody?.message ?? "",
          data: [
            ...(!isFromPullToRefresh ? prevState?.data ?? [] : []),
            ...dataBody!.data
          ]
        };
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

  const onEndReached = useCallback(() => {
    AppLog.log(() => "onEndReachedcall");
    handleGetNotificationApi(false, paginationRequestModel);
  }, [paginationRequestModel, handleGetNotificationApi]);

  const refreshCallback = async (onComplete: () => void) => {
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
      onComplete();
    });
  };

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
    handleNotificationMarkRead(notificationId!);
    const { screenName, params } = handleNotification({
      type,
      postId,
      action,
      users,
      conversationId,
      notificationId,
      sender
    });

    navigation.navigate(screenName, {
      ...params
    });
  };

  return (
    <NotificationView
      isAllDataLoaded={isAllDataLoaded}
      onEndReached={onEndReached}
      pullToRefreshCallback={refreshCallback}
      shouldShowProgressBar={notificationApi.loading}
      notifications={notifications?.data}
      openMyProfileScreen={openMyProfileScreen}
      onChangeFilter={searchText}
      navigateToRequiredScreen={navigateTOScreen}
    />
  );
};

export default NotificationController;
