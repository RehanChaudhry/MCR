import ActivityType from "models/enums/ActivityType";

type ActivityLogApiRequestModel = {
  pageNo: number;
  limit?: number;
  type?: ActivityType;
};

export default ActivityLogApiRequestModel;
