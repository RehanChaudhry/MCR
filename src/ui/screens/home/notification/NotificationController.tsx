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
import { NotificationParamList } from "routes/NotificationParams";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationView } from "ui/screens/home/notification/NotificationView";
import { AppLog } from "utils/Util";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import NotificationActionType from "models/enums/NotificationActionType";

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
    type: "",
    page: 1,
    limit: 9,
    paginate: true
  });

  const openMyProfileScreen = (userId: number) => {
    navigation.push("Profile", {
      isFrom: EScreen.NOTIFICATION,
      updateProfile: false,
      userId: userId
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

  // const openChatScreen = usePreventDoubleTap(() => {
  //   navigation.push("Chat");
  // });

  const openMyRoommatesScreen = () => {
    navigation.push("MyRoommates", { isFrom: EScreen.NOTIFICATION });
  };
  const openRoommateAgreementScreen = () => {
    navigation.push("RoommateAgreement", { isFrom: EScreen.NOTIFICATION });
  };
  const openSinglePostScreen = (postId: number) => {
    navigation.push("SinglePost", {
      postId: postId,
      isFrom: EScreen.NOTIFICATION
    });
  };

  const openFriendRequestScreen = (
    title: string,
    type: ConnectRequestType
  ) => {
    navigation.push("ConnectRequest", {
      title: title,
      type: type
    });
  };

  const navigateTOScreen = (
    type: string,
    postId?: number,
    action?: string
  ) => {
    if (type != null) {
      if (type === NotificationAndActivityLogFilterType.FRIEND_REQUEST) {
        return openFriendRequestScreen(
          "Friend Requests",
          ConnectRequestType.FRIEND_REQUESTS
        );
      } else if (
        type === NotificationAndActivityLogFilterType.ROOMMATE_REQUEST
      ) {
        return openFriendRequestScreen(
          "Roommate Requests",
          ConnectRequestType.ROOMMATE_REQUESTS
        );
      } else if (
        type === NotificationAndActivityLogFilterType.ROOMMATE_GROUP
      ) {
        return openMyRoommatesScreen();
      } else if (
        type === NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT
      ) {
        return openRoommateAgreementScreen();
      } else if (
        type === NotificationAndActivityLogFilterType.POST ||
        (action === NotificationActionType.RECIEVE &&
          type === NotificationAndActivityLogFilterType.ANNOUNCEMENT) ||
        action === NotificationActionType.COMMENT
      ) {
        return openSinglePostScreen(postId!);
      } else if (
        type === NotificationAndActivityLogFilterType.CHAT &&
        NotificationActionType.RECIEVE
      ) {
        return null;
      } else {
        return null;
      }
    }
  };

  const searchText = useCallback(
    (textToSearch: string) => {
      const updatedRequestModel = {
        ...paginationRequestModel,
        page: 1,
        type: textToSearch
      };
      setPaginationRequestModel(updatedRequestModel);
      setNotifications(undefined);
      handleGetNotificationApi(false, updatedRequestModel);
    },
    [paginationRequestModel, handleGetNotificationApi]
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
      onChangeFilter={searchText}
      navigateToRequiredScreen={navigateTOScreen}
    />
  );
};

export default NotificationController;
