import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
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
import { NotificationParamList } from "routes/NotificationParams";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationView } from "ui/screens/home/notification/NotificationView";
import { AppLog } from "utils/Util";

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
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
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);

  const [
    paginationRequestModel,
    setPaginationRequestModel
  ] = useState<PaginationParamsModel>({
    type: "friend-request",
    page: 1,
    limit: 9,
    paginate: true
  });

  const openMyProfileScreen = usePreventDoubleTap(() => {
    navigation.push("ViewProfile", { isFrom: EScreen.NOTIFICATION });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerStyle: { elevation: 0, shadowOpacity: 0 },
      headerTitle: () => <HeaderTitle text="Notification" />
    });
  }, [navigation]);

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
          data: [...(prevState?.data ?? []), ...dataBody!.data]
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
    AppLog.log("onEndReachedcall");
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
    handleGetNotificationApi(true, paginationRequestModel).then(() => {
      onComplete();
    });
  };

  const clearActivityLogList = useCallback(() => {
    setPaginationRequestModel({
      ...paginationRequestModel,
      page: 1
    });
    setNotifications(undefined);
  }, [paginationRequestModel]);

  const searchText = useCallback(
    (textToSearch: string) => {
      clearActivityLogList();

      setPaginationRequestModel({
        ...paginationRequestModel,
        type: textToSearch
      });
      handleGetNotificationApi(false, paginationRequestModel);
    },
    [
      clearActivityLogList,
      paginationRequestModel,
      handleGetNotificationApi
    ]
  );

  useEffect(() => {
    handleGetNotificationApi(false, paginationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationView
      isAllDataLoaded={isAllDataLoaded}
      onEndReached={onEndReached}
      pullToRefreshCallback={refreshCallback}
      shouldShowProgressBar={notificationApi.loading}
      notifications={notifications?.data}
      openMyProfileScreen={openMyProfileScreen}
      selectedItem={searchText}
    />
  );
};

export default NotificationController;
