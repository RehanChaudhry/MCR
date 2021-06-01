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
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> has sent you a roommate request`;
      } else if (this.type === ActivityLogType.CHAT) {
        return "View Chat";
      } else if (this.type === ActivityLogType.NEW_CONVERSATION) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Started a new conversation with`;
      } else if (this.type === ActivityLogType.DISAGREED) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Disagreed your `;
      } else if (this.type === ActivityLogType.AGREED) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Agreed your `;
      } else if (this.type === ActivityLogType.COMMENT) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Comment your `;
      } else if (this.type === ActivityLogType.ANNOUNCEMENT) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> has posted a new announcement`;
      } else if (this.type === ActivityLogType.LIKE) {
        return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> Like your `;
      }
    } else {
      return `<b>${this?.sender?.firstName} ${this?.sender?.lastName}</b> never`;
    }
  }

  // @ts-ignore
  getButtonText(): string {
    if (this.type != null) {
      if (this.type === ActivityLogType.FRIEND_REQUEST) {
        return "View Friend Request";
      } else if (this.type === ActivityLogType.ROOMMATE_REQUEST) {
        return "View Roommate Request";
      } else if (this.type === ActivityLogType.CHAT) {
        return "View Chat";
      } else if (this.type === ActivityLogType.NEW_CONVERSATION) {
        return "View New Conversation";
      } else if (this.type === ActivityLogType.DISAGREED) {
        return "View Disagreed";
      } else if (this.type === ActivityLogType.AGREED) {
        return "Agreed";
      } else if (this.type === ActivityLogType.COMMENT) {
        return "View Comment";
      } else if (this.type === ActivityLogType.ANNOUNCEMENT) {
        return "View Announcement";
      } else if (this.type === ActivityLogType.LIKE) {
        return "View Like";
      }
    } else {
      return "";
    }
  }
}

export default NotificationData;
