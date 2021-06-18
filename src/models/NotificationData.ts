import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { timeAgo } from "utils/Util";
import NotificationSenderData from "models/NotificationSenderData";
import NotificationActionType from "models/enums/NotificationActionType";

type NotificationData = {
  id: number;
  senderId?: number;
  receiverId?: number;
  referenceId?: number;
  type?: NotificationAndActivityLogFilterType;
  action?: NotificationActionType;
  data?: any | any[];
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
  if (
    notification.type ===
    NotificationAndActivityLogFilterType.FRIEND_REQUEST
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has sent you a friend request`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has sent you a roommate request`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.CHAT
  ) {
    return "View Chat";
  } else if (
    notification.type ===
    NotificationAndActivityLogFilterType.NEW_CONVERSATION
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Started a new conversation with`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.DISAGREED
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Disagreed your `;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.AGREED
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Agreed your `;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.COMMENT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> Comment your `;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ANNOUNCEMENT &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has posted a new announcement, ${notification?.data?.content}`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.LIKE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has like your post, ${notification.data.content} `;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.COMMENT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has posted a comment on your post, ${notification?.data?.content}`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.LEAVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has left your roommate group`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.RESPOND
  ) {
    return `You didn't respond to a roommate request from <b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> yet`;
  } else {
    return `<b>Message not found</b>`;
  }
}

export function getButtonText(notification: NotificationData): string {
  switch (notification.type) {
    case NotificationAndActivityLogFilterType.FRIEND_REQUEST:
      return "View Request";
    case NotificationAndActivityLogFilterType.ROOMMATE_REQUEST:
      return "View Request";
    case NotificationAndActivityLogFilterType.CHAT:
      return "View Chat";
    case NotificationAndActivityLogFilterType.NEW_CONVERSATION:
      return "View New Conversation";
    case NotificationAndActivityLogFilterType.DISAGREED:
      return "View Disagreed";
    case NotificationAndActivityLogFilterType.AGREED:
      return "Agreed";
    case NotificationAndActivityLogFilterType.COMMENT:
      return "Comment";
    case NotificationAndActivityLogFilterType.ANNOUNCEMENT:
      return "Announcement";
    case NotificationAndActivityLogFilterType.LIKE:
      return " View Like";
    case NotificationAndActivityLogFilterType.POST:
      return "View Post";
    case NotificationAndActivityLogFilterType.ROOMMATE_GROUP:
      return "View Group";
    default:
      return "N/A";
  }
}

export default NotificationData;
