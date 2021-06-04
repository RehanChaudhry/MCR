import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { timeAgo } from "utils/Util";
import NotificationSenderData from "models/NotificationSenderData";

type NotificationData = {
  id: number;
  senderId?: number;
  receiverId?: number;
  referenceId?: number;
  type?: NotificationAndActivityLogFilterType;
  isTitle?: boolean;
  titleText?: string;
  createdAt?: Date;
  sender?: NotificationSenderData;
};

export function getDisplayTime(notification: NotificationData): string {
  return timeAgo(
    notification.createdAt ?? new Date(),
    "day",
    "MMM DD, YYYY hh:mm A"
  );
}

export function getMessage(notification: NotificationData): string {
  switch (notification.type) {
    case NotificationAndActivityLogFilterType.FRIEND_REQUEST:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has sent you a friend request`;
    case NotificationAndActivityLogFilterType.ROOMMATE_REQUEST:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has sent you a roommate request`;
    case NotificationAndActivityLogFilterType.CHAT:
      return "View Chat";
    case NotificationAndActivityLogFilterType.NEW_CONVERSATION:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Started a new conversation with`;
    case NotificationAndActivityLogFilterType.DISAGREED:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Disagreed your `;
    case NotificationAndActivityLogFilterType.AGREED:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Agreed your `;
    case NotificationAndActivityLogFilterType.COMMENT:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Comment your `;
    case NotificationAndActivityLogFilterType.ANNOUNCEMENT:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has posted a new announcement`;
    case NotificationAndActivityLogFilterType.LIKE:
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Like your `;
    default:
      return `<b>Message not found</b>`;
  }
}

export function getButtonText(notification: NotificationData): string {
  switch (notification.type) {
    case NotificationAndActivityLogFilterType.FRIEND_REQUEST:
      return "View Friend Request";
    case NotificationAndActivityLogFilterType.ROOMMATE_REQUEST:
      return "View Roommate Request";
    case NotificationAndActivityLogFilterType.CHAT:
      return "View Chat";
    case NotificationAndActivityLogFilterType.NEW_CONVERSATION:
      return "View New Conversation";
    case NotificationAndActivityLogFilterType.DISAGREED:
      return "View Disagreed";
    case NotificationAndActivityLogFilterType.AGREED:
      return "Agreed";
    case NotificationAndActivityLogFilterType.COMMENT:
      return "View Comment";
    case NotificationAndActivityLogFilterType.ANNOUNCEMENT:
      return "View Announcement";
    case NotificationAndActivityLogFilterType.LIKE:
      return "View Like";
    default:
      return "N/A";
  }
}

export default NotificationData;
