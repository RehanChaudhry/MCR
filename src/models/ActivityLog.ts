import { timeAgo } from "utils/Util";
import Actions from "models/enums/ActivityLogAction";
import ActivityLogType from "models/enums/ActivityLogType";
import { User } from "models/User";
import { ChronologicalObject } from "utils/SectionListHelper";

class ActivityLog implements ChronologicalObject {
  id!: number;
  type?: ActivityLogType;
  user?: User;
  action?: Actions;
  createdAt!: Date;

  constructor(activityLog: ActivityLog) {
    Object.assign(this, activityLog);
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
        this.action === Actions.CREATE
      ) {
        return `Sent a friend request to <b>${this.user?.firstName}${
          " " + this.user?.lastName
        }</b>`;
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
        this.action === Actions.CREATE
      ) {
        return `Sent a roommate request to <b>${this.user?.firstName}${
          " " + this.user?.lastName
        }</b>`;
      } else if (
        this.type === ActivityLogType.ROOMMATE_REQUEST &&
        this.action === Actions.ACCEPTED
      ) {
        return `Accepted a roommate request from <b>${
          this.user?.firstName
        }${" " + this.user?.lastName}</b>`;
      } else if (
        (this.type === ActivityLogType.ROOMMATE_REQUEST && this.action) ===
        Actions.REJECTED
      ) {
        return "Rejected roommate request";
      } else if (
        this.type === ActivityLogType.DISMISSED_LIST &&
        this.action === Actions.CREATE
      ) {
        return `Added <b>${this.user?.firstName}${
          " " + this.user?.lastName
        }</b> to dismiss list`;
      } else if (
        this.type === ActivityLogType.DISMISSED_LIST &&
        this.action === Actions.REMOVED
      ) {
        return `Removed <b>${this.user?.firstName}${
          " " + this.user?.lastName
        }</b> from dismiss list`;
      } else if (
        this.type === ActivityLogType.POST &&
        this.action === Actions.CREATE
      ) {
        return "Created a new post in commmunity";
      } else if (
        this.type === ActivityLogType.POST &&
        this.action === Actions.COMMENTED
      ) {
        return "Commented on any post";
      } else if (
        this.type === ActivityLogType.CONVERSATION &&
        this.action === Actions.STARTED
      ) {
        return "Started a new conversation with";
      } else if (
        this.type === ActivityLogType.QUESTIONAIRE &&
        this.action === Actions.CREATE
      ) {
        return `Update your <b>Questionaire</b>`;
      } else if (
        this.type === ActivityLogType.PROFILE &&
        this.action === Actions.UPDATED
      ) {
        return `Update your <b>Profile</b>`;
      } else if (
        this.type === ActivityLogType.ROOMMATE_AGREEMENT &&
        this.action === Actions.UPDATED_AND_AGREED
      ) {
        return `Updated and agreed on <b>Rommate Agreement</b>`;
      } else if (
        this.type === ActivityLogType.LOGIN_STUDENT ||
        (this.type === ActivityLogType.LOGIN_STAFF &&
          this.action === Actions.LOGIN)
      ) {
        return `Logged in to your <b>Profile</b>`;
      }
    } else {
      return "Commented on any post";
    }
  }
}

export default ActivityLog;
