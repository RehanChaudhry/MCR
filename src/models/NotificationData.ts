import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { timeAgo } from "utils/Util";
import NotificationActionType from "models/enums/NotificationActionType";
import { User } from "models/User";

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
};

export function getDisplayTime(notification: NotificationData): string {
  return timeAgo(
    notification.createdAt ?? new Date(),
    "day",
    "MMM DD, YYYY hh:mm A"
  );
}

// const getUsers = (users: [User], currentUserId: number) => {
//   if (users.length !== 1) {
//     return `<b>${users.reduce(
//       (newArray: string[], _item: User) => (
//         currentUserId !== _item.id &&
//           newArray.push(_item.firstName + " " + _item.lastName),
//         newArray
//       ),
//       []
//     )} and you</b>`;
//   } else {
//     return "you";
//   }
// };

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
    notification.type === NotificationAndActivityLogFilterType.CHAT &&
    notification.action === NotificationActionType.RECIEVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has sent you a chat message`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.NEW_CONVERSATION &&
    notification.action === NotificationActionType.CREATE
  ) {
    return `<b>${notification?.sender?.firstName} ${
      notification?.sender?.lastName
    }</b> has sent you ${
      notification.count > 0 && notification.count
    } new message${notification.count > 1 ? "s" : ""} `;
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
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has posted a new announcement, <b>${notification?.data?.content}</b>`;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.LIKE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has like your post, <b>${notification.data.content}</b> `;
  } else if (
    notification.type === NotificationAndActivityLogFilterType.POST &&
    notification.action === NotificationActionType.COMMENT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has posted a comment on your post, <b>${notification?.data?.content}</b>`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.RESPOND
  ) {
    return `You didn't respond to a roommate request from <b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> yet`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
    notification.action === NotificationActionType.ACCEPT
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has accepted your roommate request`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.LEAVE
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has left your roommate group`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.ENTER
  ) {
    return `<b>${notification?.sender?.firstName} ${notification?.sender?.lastName}</b> has joined your roommate group`;
  } else if (
    notification.type ===
      NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
    notification.action === NotificationActionType.UPDATE
  ) {
    return `Your roommate list has been updated by an Admin`;
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
