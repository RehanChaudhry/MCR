import ActivityLogType from "models/enums/ActivityLogType";
import { timeAgo } from "utils/Util";
import NotificationSenderData from "models/NotificationSenderData";
import { ChronologicalObject } from "utils/SectionListHelper";

class NotificationData implements ChronologicalObject {
  id!: number;
  senderId?: number;
  receiverId?: number;
  referenceId?: number;
  type?: ActivityLogType;
  createdAt!: Date;
  sender?: NotificationSenderData;

  constructor(notificationData: NotificationData) {
    Object.assign(this, notificationData);
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
    if (this.type != null) {
      if (this.type === ActivityLogType.FRIEND_REQUEST) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> has sent you a friend request`;
      } else if (this.type === ActivityLogType.ROOMMATE_REQUEST) {
        return "<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>has sent you a roommate request";
      } else if (this.type === ActivityLogType.ANNOUNCEMENT) {
        return "<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>has posted a new announcement";
      } else if (this.type === ActivityLogType.POST) {
        return "<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>Commented on any post";
      } else if (this.type === ActivityLogType.CONVERSATION) {
        return "<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>Started a new conversation with";
      } else if (this.type === ActivityLogType.QUESTIONAIRE) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>Update your `;
      } else if (this.type === ActivityLogType.PROFILE) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b>Update your `;
      } else if (this.type === ActivityLogType.LIKE) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Update your `;
      }
    } else {
      return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> ds`;
    }
  }

  // @ts-ignore
  getButtonText(): string {
    if (this.type != null) {
      if (this.type === ActivityLogType.FRIEND_REQUEST) {
        return "View Friend Request";
      }
    } else {
      return "";
    }
  }
}

export default NotificationData;
