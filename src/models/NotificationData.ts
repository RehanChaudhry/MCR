import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { timeAgo } from "utils/Util";
import NotificationActionType from "models/enums/NotificationActionType";
import { User } from "models/User";
import { UserModel } from "./api_responses/UserModel";

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
  isRead: number;
  count: number;
  createdAt?: Date;
  sender?: User;
  roleTitle?: string;
};

export function getDisplayTime(notification: NotificationData): string {
  return timeAgo(
    notification.createdAt ?? new Date(),
    "day",
    "MMM DD, YYYY hh:mm A"
  );
}

const getConversationUser = (users: [User], currentUserId: number) => {
  if (users.length > 1) {
    return `<b>${
      users.find((_item) => _item.id !== currentUserId)?.firstName +
      " " +
      users.find((_item) => _item.id !== currentUserId)?.lastName
    }</b>`;
  } else {
    return "";
  }
};

export function getMessage(
  notification: NotificationData,
  user: UserModel | undefined
): string {
  if (
    notification.type ===
      NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> sent you a friend request.`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
    notification.action === NotificationActionType.ACCEPT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has accepted your friend request.`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> sent you a roommate request.`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.CHAT &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> sent you a new message.`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.NEW_CONVERSATION &&
    notification.action === NotificationActionType.CREATE
  ) {
    return `<b>${notification?.sender?.firstName} ${
      notification?.sender?.lastName
    }</b> started a new conversation with you, ${getConversationUser(
      notification?.data?.users,
      user?.profile?.id!
    )} & ${notification.count > 2 && notification.count - 2 + " more."}`;
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
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> posted a new announcement, <b>${notification?.data?.content}</b>`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.LIKE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> liked your post, <b>${notification.data.content}</b> `;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.COMMENT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> posted a comment on your post, <b>${notification?.data?.content}</b>`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.RESPOND
  ) {
    return `You didn't respond to a roommate request yet.`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.ACCEPT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> accepted your roommate request`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.LEAVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> left your roommate group`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.ENTER
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> joined your roommate group`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.UPDATE
  ) {
    if (notification.roleTitle === "Admin") {
      return `Your roommate list has been updated by an Admin`;
    } else {
      return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> updated your roommate agreement.`;
    }
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
    notification.action === NotificationActionType.DISAGREE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has edited and disagreed on roommate agreement`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
    notification.action === NotificationActionType.AGREE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has edited and disagreed on roommate agreement`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
    notification.action === NotificationActionType.ACCEPT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has modified your roommate agreement`;
  } else {
    return `<b>Message not found</b>`;
  }
}

export function getButtonText(notification: NotificationData): string {
  if (
    notification.type ===
    NotificationAndActivityLogFilterType.FRIEND_REQUEST
  ) {
    return "View Request";
  } else if (
    notification.type ===
    NotificationAndActivityLogFilterType.ROOMMATE_REQUEST
  ) {
    return "View Request";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.CHAT &&
    NotificationActionType.RECIEVE
  ) {
    return "View Chat";
  } else if (
    notification.type ===
    NotificationAndActivityLogFilterType.NEW_CONVERSATION
  ) {
    return "View Conversation";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.DISAGREED
  ) {
    return "View Disagreed";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.AGREED
  ) {
    return "View Agreed";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    NotificationActionType.COMMENT
  ) {
    return "View Comment";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.ANNOUNCEMENT
  ) {
    return "View Announcement";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.LIKE
  ) {
    return " View Like";
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST
  ) {
    return "View Post";
  } else if (
    notification.type ===
    NotificationAndActivityLogFilterType.ROOMMATE_GROUP
  ) {
    return "View Group";
  } else if (
    notification.type ===
    NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT
  ) {
    return "View Details";
  } else {
    return "N/A";
  }
}

export default NotificationData;
