import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import { useApi } from "repo/Client";
import { ActivityLogStackParamList } from "routes/ActivityLogStack";
import ProfileApis from "repo/auth/ProfileApis";
import ActivityLogApiRequestModel from "models/api_requests/ActivityLogApiRequestModel";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import { ActivityLogView } from "ui/screens/home/activity_log/ActivityLogView";
import { toSectionList } from "utils/SectionListHelper";
import { DropDownItem } from "models/DropDownItem";

type ActivityLogNavigationProp = StackNavigationProp<
  ActivityLogStackParamList,
  "ActivityLog"
>;

type Props = {};

const ActivityLogController: FC<Props> = () => {
  AppLog.log("Opening ActivityLogController");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<ActivityLogNavigationProp>();
  const [searchByKeyword, setSearchByKeyword] = useState<DropDownItem>();

  // Activity Log API
  const activityLogApi = useApi<
    ActivityLogApiRequestModel,
    ActivityLogsResponseModel
  >(ProfileApis.activityLogs);

  const requestModel = useRef<ActivityLogApiRequestModel>({
    paginate: true,
    page: 1,
    limit: 1,
    keyword: searchByKeyword?.title,
    userType: "Student",
    actionType: "new-student",
    startDate: "2018-11-26",
    endDate: "2021-07-26",
    attributes: "id,userId,createdAt,data"
  });
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const isFetchingInProgress = useRef(false);
  const [
    activityLogs,
    setActivityLogs
  ] = useState<ActivityLogsResponseModel>();

  const refreshCallback = async (onComplete: () => void) => {
    requestModel.current.page = 1;
    setIsAllDataLoaded(false);
    getActivityLogs().then(() => {
      onComplete();
    });
  };

  const getActivityLogs = async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;
    if (requestModel.current.page === 0) {
      isFetchingInProgress.current = false;
      setIsAllDataLoaded(true);
      return;
    }

    // AppLog.log(
    //   "in getActivityLogs(), fetching page: " +
    //     JSON.stringify(requestModel.current)
    // );

    const {
      hasError,
      errorBody,
      dataBody
    } = await activityLogApi.request([requestModel.current]);

    // const { hasError, errorBody, dataBody } = await activityLogApi.request([
    //   requestModel.current
    // ]);

    if (!hasError) {
      if (requestModel.current.page === 1) {
        setActivityLogs({ message: "", data: [] });
      }
      setActivityLogs((prevState) => ({
        message: dataBody!.message,
        data: [
          ...(prevState === undefined || requestModel.current.page === 1
            ? []
            : prevState.data),
          ...dataBody!.data
        ],
        pagination: dataBody!.pagination
      }));
      requestModel.current.page = dataBody!.pagination?.next ?? 0;
    } else {
      Alert.alert("Unable to fetch matches", errorBody);
      AppLog.log("Actitivy Logs" + activityLogs);
    }

    isFetchingInProgress.current = false;
  };

  const onEndReached = () => {
    // getActivityLogs();
  };
  const searchText = useCallback((textToSearch: DropDownItem) => {
    AppLog.log("Searching: " + textToSearch);
    setSearchByKeyword(textToSearch);
  }, []);

  useEffect(() => {
    getActivityLogs();
  });

  return (
    <ActivityLogView
      selectedItem={searchText}
      isApiLoading={activityLogApi.loading}
      activityLogs={toSectionList(activityLogs?.data ?? [])}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default ActivityLogController;
