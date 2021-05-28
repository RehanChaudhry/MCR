import ActivityLog from "models/ActivityLog";

type ActivityLogsResponseModel = {
  message: string;
  data: ActivityLog[];
};

export default ActivityLogsResponseModel;
