import React, { FC, useEffect, useRef, useState } from "react";
import { Alert } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { AppLog } from "utils/Util";
import DataGenerator from "utils/DataGenerator";
import { useApi } from "repo/Client";
import { ActivityLogStackParamList } from "routes/ActivityLogStack";
import ProfileApis from "repo/auth/ProfileApis";
import ActivityLogApiRequestModel from "models/api_requests/ActivityLogApiRequestModel";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import { ActivityLogView } from "ui/screens/home/activity_log/ActivityLogView";

type ActivityLogNavigationProp = StackNavigationProp<
  ActivityLogStackParamList,
  "ActivityLog"
>;

type Props = {};

const ActivityLogController: FC<Props> = () => {
  AppLog.log("Opening ActivityLogController");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<ActivityLogNavigationProp>();

  // Activity Log API
  const activityLogApi = useApi<
    ActivityLogApiRequestModel,
    ActivityLogsResponseModel
  >(ProfileApis.activityLogs);

  const requestModel = useRef<ActivityLogApiRequestModel>({
    limit: 5,
    pageNo: 1,
    type: undefined
  });
  const [isAllDataLoaded, setIsAllDataLoaded] = useState(false);
  const isFetchingInProgress = useRef(false);
  const [
    activityLogs,
    setActivityLogs
  ] = useState<ActivityLogsResponseModel>();

  const refreshCallback = async (onComplete: () => void) => {
    requestModel.current.pageNo = 1;
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
    if (requestModel.current.pageNo === 0) {
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
    } = await DataGenerator.getActivityLogs(requestModel.current);

    // const { hasError, errorBody, dataBody } = await activityLogApi.request([
    //   requestModel.current
    // ]);

    if (!hasError) {
      if (requestModel.current.pageNo === 1) {
        setActivityLogs({ message: "", data: [] });
      }
      setActivityLogs((prevState) => ({
        message: dataBody!.message,
        data: [
          ...(prevState === undefined || requestModel.current.pageNo === 1
            ? []
            : prevState.data),
          ...dataBody!.data
        ],
        pagination: dataBody!.pagination
      }));
      requestModel.current.pageNo = dataBody!.pagination?.next ?? 0;
    } else {
      Alert.alert("Unable to fetch matches", errorBody);
    }

    isFetchingInProgress.current = false;
  };

  const onEndReached = () => {
    getActivityLogs();
  };

  useEffect(() => {
    getActivityLogs();
  }, []);

  return (
    <ActivityLogView
      isApiLoading={activityLogApi.loading}
      activityLogs={activityLogs?.data}
      pullToRefreshCallback={refreshCallback}
      onEndReached={onEndReached}
      isAllDataLoaded={isAllDataLoaded}
    />
  );
};

export default ActivityLogController;
