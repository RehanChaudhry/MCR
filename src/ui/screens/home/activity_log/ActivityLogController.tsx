import React, {
  FC,
  useCallback,
  useEffect,
  useRef,
  useState
} from "react";
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
  const LIMIT = 20;
  const [shouldShowProgressBar, setShouldShowProgressBar] = useState(
    false
  );
  const [searchByKeyword, setSearchByKeyword] = useState<DropDownItem>();
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const [
    activityLogs,
    setActivityLogs
  ] = useState<ActivityLogsResponseModel>();
  const isFetchingInProgress = useRef(false);

  const requestModel = useRef<ActivityLogApiRequestModel>({
    paginate: true,
    page: 1,
    limit: LIMIT
  });

  // Activity Log API
  const activityLogApi = useApi<
    ActivityLogApiRequestModel,
    ActivityLogsResponseModel
  >(ProfileApis.activityLogs);

  const getActivityLogs = useCallback(async () => {
    if (isFetchingInProgress.current) {
      return;
    }
    isFetchingInProgress.current = true;

    const currentPageToReload = requestModel.current.page;

    if (currentPageToReload === 0) {
      AppLog.log("No data left to fetch");
      isFetchingInProgress.current = false;
      setIsAllDataLoaded(true);
      return;
    }

    requestModel.current.page!! > 1 && setShouldShowProgressBar(true);
    const { hasError, dataBody } = await activityLogApi.request([
      requestModel.current
    ]);

    setShouldShowProgressBar(false);
    if (!hasError) {
      setActivityLogs((prevState) => {
        return {
          message: dataBody!.message,
          data: [
            ...(requestModel.current.page!! === 1 ||
            prevState === undefined
              ? []
              : prevState.data),
            ...dataBody!.data
          ]
        };
      });

      if ((dataBody?.data.length ?? 0) < LIMIT) {
        // All data has been loaded
        requestModel.current.page = 0;
      }

      requestModel.current.page = requestModel.current.page!! + 1;
    }

    isFetchingInProgress.current = false;
  }, [activityLogApi]);

  const onEndReached = useCallback(() => {
    AppLog.log("onEndReachedcall");
    getActivityLogs();
  }, [getActivityLogs]);

  const refreshCallback = async (onComplete: () => void) => {
    setIsAllDataLoaded(false);
    requestModel.current.page = 1;
    getActivityLogs().then(() => {
      onComplete();
    });
  };

  const searchText = useCallback(
    (textToSearch: DropDownItem) => {
      AppLog.log("Searching: " + textToSearch);
      setSearchByKeyword(textToSearch);
      AppLog.log(searchByKeyword);
    },
    [searchByKeyword]
  );

  useEffect(() => {
    getActivityLogs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  AppLog.log("dataLength: " + activityLogs?.data.length);

  return (
    <ActivityLogView
      selectedItem={searchText}
      isApiLoading={shouldShowProgressBar}
      activityLogs={toSectionList(activityLogs?.data ?? [])}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default ActivityLogController;
