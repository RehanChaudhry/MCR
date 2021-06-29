import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import { useApi } from "repo/Client";
import ProfileApis from "repo/auth/ProfileApis";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import { ActivityLogView } from "ui/screens/home/activity_log/ActivityLogView";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { Alert } from "react-native";
import EScreen from "models/enums/EScreen";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import Actions from "models/enums/ActivityLogAction";
import { HomeStackParamList } from "routes/HomeStack";
import ActivityLog from "models/ActivityLog";
import usePreventDoubleTap from "hooks/usePreventDoubleTap";
import useAuth from "hooks/useAuth";

type ActivityLogNavigationProp = StackNavigationProp<
  HomeStackParamList,
  "ActivityLog"
>;

type Props = {};

const ActivityLogController: FC<Props> = () => {
  const navigation = useNavigation<ActivityLogNavigationProp>();
  const { user } = useAuth();

  const [
    activityLogs,
    setActivityLogs
  ] = useState<ActivityLogsResponseModel>();

  const activityLogApi = useApi<any, ActivityLogsResponseModel>(
    ProfileApis.activityLogs
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerStyle: { elevation: 0, shadowOpacity: 0 },
      headerTitle: () => <HeaderTitle text="Activity Log" />
    });
  }, [navigation]);

  const handleGetActivityLogApi = useCallback(
    async (
      isFromPullToRefresh: boolean,
      requestModel: PaginationParamsModel
    ) => {
      if (activityLogApi.loading) {
        return;
      }
      const { hasError, dataBody } = await activityLogApi.request([
        requestModel
      ]);

      if (hasError) {
        Alert.alert(
          "Unable to fetch activitylogs",
          "Please try again later"
        );
        return;
      }
      setActivityLogs((prevState) => {
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
    [activityLogApi]
  );

  const onEndReached = useCallback(() => {
    AppLog.log(() => "onEndReachedcall");
    handleGetActivityLogApi(false, paginationRequestModel);
  }, [paginationRequestModel, handleGetActivityLogApi]);

  const refreshCallback = async (onComplete: () => void) => {
    if (activityLogApi.loading) {
      onComplete?.();
      return;
    }

    const myFriendRequestModel: PaginationParamsModel = {
      ...paginationRequestModel,
      page: 1
    };

    setPaginationRequestModel(myFriendRequestModel);
    handleGetActivityLogApi(true, myFriendRequestModel).then(() => {
      onComplete();
    });
  };

  const searchText = useCallback(
    (textToSearch: string) => {
      const updatedRequestModel = {
        ...paginationRequestModel,
        page: 1,
        type: textToSearch
      };
      setPaginationRequestModel(updatedRequestModel);
      setActivityLogs(undefined);
      handleGetActivityLogApi(false, updatedRequestModel);
    },
    [paginationRequestModel, handleGetActivityLogApi]
  );

  const openMyProfileScreen = usePreventDoubleTap(
    (userId?: number, userName?: string) => {
      navigation.push("ViewProfile", {
        isFrom: EScreen.ACTIVTY_LOG,
        userId: userId!,
        userName: userName
      });
    }
  );

  const openRoommateAgreementScreen = usePreventDoubleTap(() => {
    navigation.push("RoommateAgreement", { isFrom: EScreen.ACTIVTY_LOG });
  });

  const openSinglePostScreen = usePreventDoubleTap((postId: number) => {
    navigation.push("SinglePost", {
      postId: postId,
      isFrom: EScreen.ACTIVTY_LOG
    });
  });

  const navigateToScreen = (activityLog: ActivityLog) => {
    const { type, action, user: _user, entityId, data } = activityLog;

    const filteredUserId = data?.filter(
      (item: any) => item.id !== user?.profile?.id
    );

    if (!type || !action) {
      return;
    }

    if (
      type === NotificationAndActivityLogFilterType.LOGIN_STUDENT &&
      action === Actions.LOGIN
    ) {
      return openMyProfileScreen(
        _user?.id,
        _user?.firstName + " " + _user?.lastName
      );
    } else if (
      (type === NotificationAndActivityLogFilterType.COMMENT &&
        action === Actions.CREATE) ||
      (type === NotificationAndActivityLogFilterType.POST &&
        action === Actions.CREATE)
    ) {
      return openSinglePostScreen(entityId!);
    } else if (
      (type === NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        action === Actions.ACCEPTED) ||
      (type === NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        action === Actions.ACCEPTED)
    ) {
      return openMyProfileScreen(
        data?.senderId,
        data?.senderFirstName + " " + data?.senderLastName
      );
    } else if (
      (type === NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        action === Actions.REJECTED) ||
      (type === NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        action === Actions.REJECTED)
    ) {
      return openMyProfileScreen(
        data?.senderId,
        data?.senderFirstName + " " + data?.senderLastName
      );
    } else if (
      type === NotificationAndActivityLogFilterType.PROFILE &&
      action === Actions.UPDATED
    ) {
      return openMyProfileScreen(
        _user?.id,
        _user?.firstName + " " + _user?.lastName
      );
    } else if (
      (type === NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        action === Actions.CREATE) ||
      (type === NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        action === Actions.CREATE)
    ) {
      return openMyProfileScreen(
        data?.receiverId,
        data?.receiverFirstName + " " + data?.receiverLastName
      );
    } else if (
      type === NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
      action === Actions.ACCEPTED
    ) {
      return openRoommateAgreementScreen();
    } else if (
      type === NotificationAndActivityLogFilterType.DISMISSED_LIST &&
      action === Actions.CREATE
    ) {
      return openMyProfileScreen(
        data?.id,
        data?.firstName + " " + data?.lastName
      );
    } else if (
      type === NotificationAndActivityLogFilterType.RESTORED &&
      action === Actions.CREATE
    ) {
      return openMyProfileScreen(
        data?.id,
        data?.firstName + " " + data?.lastName
      );
    } else if (
      type === NotificationAndActivityLogFilterType.NEW_CONVERSATION &&
      action === Actions.CREATE
    ) {
      return openMyProfileScreen(
        filteredUserId[0].id,
        filteredUserId[0].firstName + " " + filteredUserId[0].lastName
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    handleGetActivityLogApi(false, paginationRequestModel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <ActivityLogView
      onChangeFilter={searchText}
      shouldShowProgressBar={activityLogApi.loading}
      activityLogs={activityLogs?.data}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      navigateToScreen={navigateToScreen}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default ActivityLogController;
