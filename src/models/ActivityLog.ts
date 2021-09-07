import { timeAgo } from "utils/Util";
import Actions from "models/enums/ActivityLogAction";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { User } from "models/User";
import { UserModel } from "models/api_responses/UserModel";

type ActivityLog = {
  id: number;
  type?: NotificationAndActivityLogFilterType;
  user?: User;
  action?: Actions;
  entityId?: number;
  data?: any | any[];
  createdAt: Date;
};

export type ActivityData = {};

export function getDisplayTime(activityLog: ActivityLog): string {
  return timeAgo(
    activityLog.createdAt ?? new Date(),
    "day",
    "MMM DD, YYYY hh:mm A"
  );
}

const getUsers = (users: [User], currentUser: UserModel | undefined) => {
  return `${users.reduce(
    (newArray: string[], _item: User) => (
      currentUser?.profile?.id !== _item.id &&
        newArray.push(
          "<b>" + _item.firstName + " " + _item.lastName + "</b>"
        ),
      newArray
    ),
    []
  )}`;
};

// @ts-ignore
export function getMessage(
  activityLog: ActivityLog,
  user?: UserModel | undefined
): string {
  if (activityLog.type != null) {
    if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Sent a friend request to <b>${
        activityLog.data?.receiverFirstName
      }${" " + activityLog.data?.receiverLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
      activityLog.action === Actions.ACCEPTED
    ) {
      return `Accepted friend request <b>${
        activityLog.data?.senderFirstName
      }${" " + activityLog.data?.senderLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
      activityLog.action === Actions.REJECTED
    ) {
      return `Rejected friend request <b>${
        activityLog.data?.senderFirstName
      }${" " + activityLog.data?.senderLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Sent a roommate request to <b>${
        activityLog?.data?.receiverFirstName
      }${" " + activityLog?.data?.receiverLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
      activityLog.action === Actions.ACCEPTED
    ) {
      return `Accepted a roommate request from <b>${
        activityLog.data?.senderFirstName
      }${" " + activityLog.data?.senderLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
      activityLog.action === Actions.REJECTED
    ) {
      return `Rejected roommate request <b>${
        activityLog.data?.senderFirstName
      }${" " + activityLog.data?.senderLastName}</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.DISMISSED_LIST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Added <b>${activityLog.data?.firstName}${
        " " + activityLog.data?.lastName
      }</b> to dismiss list`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.DISMISSED_LIST &&
      activityLog.action === Actions.REMOVED
    ) {
      return `Removed<b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b> from dismiss list`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.POST &&
      activityLog.action === Actions.COMMENTED
    ) {
      return `Commented on any post <b>Post commneted</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.QUESTIONAIRE &&
      activityLog.action === Actions.CREATE
    ) {
      return `Updated your <b>Questionaire</b>`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.PROFILE &&
      activityLog.action === Actions.UPDATED
    ) {
      return `Updated your <b>Profile</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
      activityLog.action === Actions.ACCEPTED
    ) {
      return `Updated and agreed on <b>Roommate Agreement</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.LOGIN_STUDENT ||
      (activityLog.type ===
        NotificationAndActivityLogFilterType.LOGIN_STAFF &&
        activityLog.action === Actions.LOGIN)
    ) {
      return `Logged in to your <b>Profile</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
      activityLog.action === Actions.REJECTED
    ) {
      return `Rejected <b>Roommate Agreement</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
      activityLog.action === Actions.UPDATED_AND_AGREED
    ) {
      return `Accepted <b>Roommate Agreement</b>`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.COMMENT &&
      activityLog.action === Actions.CREATE
    ) {
      return `Commented on a post, <b>"${activityLog?.data?.content?.replace(
        /\r?\n|\r/g,
        " "
      )}"</b>`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.RESTORED &&
      activityLog.action === Actions.CREATE
    ) {
      return `Removed <b>${activityLog.data?.firstName}${
        " " + activityLog.data?.lastName
      }</b> from dissmissed list`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.POST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Created a new post in commmunity, <b>"${activityLog?.data?.content?.replace(
        /\r?\n|\r/g,
        " "
      )}"</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.CONVERSATION &&
      activityLog.action === Actions.CREATE
    ) {
      return `Started a new conversation with ${getUsers(
        activityLog.data,
        user
      )} `;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.BLOCKED &&
      activityLog.action === Actions.CREATE
    ) {
      return `Added  <b>${activityLog.data?.firstName}${
        " " + activityLog.data?.lastName
      }</b> to the blocked list `;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.BLOCKED &&
      activityLog.action === Actions.DELETE
    ) {
      return `Removed <b>${activityLog.data?.firstName}${
        " " + activityLog.data?.lastName
      }</b> from the blocked list `;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.POST &&
      activityLog.action === Actions.REPORT
    ) {
      return `Post Report`;
    } else {
      return "Commented on any post";
    }
  } else {
    return "Commented on any post";
  }
}

export default ActivityLog;
