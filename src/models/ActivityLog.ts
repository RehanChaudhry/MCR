import { DateUtils, timeAgo } from "utils/Util";
import Actions from "models/enums/ActivityLogAction";
import ActivityLogType from "models/enums/ActivityLogType";

class ActivityLog {
  id!: number;
  type?: ActivityLogType;
  action?: Actions;
  createdAt?: Date;

  constructor(activityLog: ActivityLog) {
    Object.assign(this, activityLog);
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

  // @ts-ignore
  getMessage(): string {
    if (this.action != null) {
      if (
        this.type === ActivityLogType.FRIEND_REQUEST &&
        this.action === Actions.SENT
      ) {
        return "Sent friend request";
      } else if (
        this.type === ActivityLogType.FRIEND_REQUEST &&
        this.action === Actions.ACCEPTED
      ) {
        return "Accepted friend request";
      } else if (
        (this.type === ActivityLogType.FRIEND_REQUEST && this.action) ===
        Actions.REJECTED
      ) {
        return "Rejected friend request";
      } else if (
        this.type === ActivityLogType.ROOMMATE_REQUEST &&
        this.action === Actions.SENT
      ) {
        return "Sent roommate request";
      } else if (
        this.type === ActivityLogType.ROOMMATE_REQUEST &&
        this.action === Actions.ACCEPTED
      ) {
        return "Accepted roommate request";
      } else if (
        (this.type === ActivityLogType.ROOMMATE_REQUEST && this.action) ===
        Actions.REJECTED
      ) {
        return "Rejected roommate request";
      } else if (
        this.type === ActivityLogType.DISMISSED_LIST &&
        this.action === Actions.ADDED
      ) {
        return "Added someone to dismiss list";
      } else if (
        this.type === ActivityLogType.POST &&
        this.action === Actions.COMMENTED
      ) {
        return "Commented on any post";
      } else if (
        this.type === ActivityLogType.POST &&
        this.action === Actions.CREATE
      ) {
        return "Created a new post";
      } else if (this.action === Actions.REMOVED) {
        return "Commented on any post";
      } else if (this.action === Actions.STARTED) {
        return "Commented on any post";
      } else if (this.action === Actions.UPDATED) {
        return "Commented on any post";
      } else if (this.action === Actions.UPDATED_AND_AGREED) {
        return "Commented on any post";
      }
    } else {
      return "Commented on any post";
    }
  }
}

export default ActivityLog;
