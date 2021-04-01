import ActivityType from "models/enums/ActivityType";
import { DateUtils } from "utils/Util";

class ActivityLog {
  id!: number;
  type?: ActivityType;
  message?: string;
  date?: Date;

  constructor(
    id: number,
    type: ActivityType,
    message: string,
    date: Date
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.date = date;
  }

  getHoursDiff(): number {
    return DateUtils.diffInHours(this.date ?? new Date());
  }
}

export default ActivityLog;
