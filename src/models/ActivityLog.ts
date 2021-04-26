import ActivityType from "models/enums/ActivityType";
import { DateUtils, timeAgo } from "utils/Util";

class ActivityLog {
  id!: number;
  type?: ActivityType;
  message?: string;
  createdAt?: Date;

  constructor(
    id: number,
    type: ActivityType,
    message: string,
    date: Date
  ) {
    this.id = id;
    this.type = type;
    this.message = message;
    this.createdAt = date;
  }

  getHoursDiff(): number {
    return DateUtils.diffInHours(this.createdAt ?? new Date());
  }

  getDisplayTime(): string {
    return timeAgo(
      this.createdAt ?? new Date(),
      "day",
      "MMM DD, YYYY hh:mm A"
    );
  }
}

export default ActivityLog;
