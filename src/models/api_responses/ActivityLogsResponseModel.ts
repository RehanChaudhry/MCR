import { Pagination } from "models/Pagination";
import ActivityLog from "models/ActivityLog";

type ActivityLogsResponseModel = {
  message: string;
  data: ActivityLog[];
  pagination?: Pagination;
};

export default ActivityLogsResponseModel;
