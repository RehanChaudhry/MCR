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
import { ActivityLogStackParamList } from "routes/ActivityLogStack";
import ProfileApis from "repo/auth/ProfileApis";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import { ActivityLogView } from "ui/screens/home/activity_log/ActivityLogView";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { Alert } from "react-native";

type ActivityLogNavigationProp = StackNavigationProp<
  ActivityLogStackParamList,
  "ActivityLog"
>;

type Props = {};

const ActivityLogController: FC<Props> = () => {
  const navigation = useNavigation<ActivityLogNavigationProp>();

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
    type: "friend-request",
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
    AppLog.log("onEndReachedcall");
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
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default ActivityLogController;
