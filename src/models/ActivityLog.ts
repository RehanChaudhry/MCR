import ActivityType from "models/enums/ActivityType";

type ActivityLog = {
  id: number;
  type: ActivityType;
  message: string;
  date: Date;
};

export default ActivityLog;
