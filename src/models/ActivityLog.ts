import { timeAgo } from "utils/Util";
import Actions from "models/enums/ActivityLogAction";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import { User } from "models/User";

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

// @ts-ignore
export function getMessage(activityLog: ActivityLog): string {
  if (activityLog.type != null) {
    if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Sent a friend request to <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
      activityLog.action === Actions.ACCEPTED
    ) {
      return `Accepted friend request <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b>`;
    } else if (
      (activityLog.type ===
        NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        activityLog.action) === Actions.REJECTED
    ) {
      return `Rejected friend request <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }" </b>`;
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
        activityLog.user?.firstName
      }${" " + activityLog.user?.lastName}</b>`;
    } else if (
      (activityLog.type ===
        NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        activityLog.action) === Actions.REJECTED
    ) {
      return `Rejected roommate request <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.DISMISSED_LIST &&
      activityLog.action === Actions.CREATE
    ) {
      return `Added <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b> to dismiss list`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.DISMISSED_LIST &&
      activityLog.action === Actions.REMOVED
    ) {
      return `Removed <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
      }</b> from dismiss list`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.POST &&
      activityLog.action === Actions.COMMENTED
    ) {
      return `Commented on any post <b>Post commneted</b>`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.CONVERSATION &&
      activityLog.action === Actions.STARTED
    ) {
      return `Started a <b>new conversation</b> with`;
    } else if (
      activityLog.type ===
        NotificationAndActivityLogFilterType.QUESTIONAIRE &&
      activityLog.action === Actions.CREATE
    ) {
      return `Update your <b>Questionaire</b>`;
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
      return `Commented on a post, <b>${activityLog?.data?.content?.replace(
        /\r?\n|\r/g,
        " "
      )}</b>`;
    } else if (
      activityLog.type === NotificationAndActivityLogFilterType.RESTORED &&
      activityLog.action === Actions.CREATE
    ) {
      return `Removed <b>${activityLog.user?.firstName}${
        " " + activityLog.user?.lastName
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
      return `Started a new conversation with <b>${
        activityLog.user?.firstName
      }${" " + activityLog.user?.lastName} </b>`;
    }
  } else {
    return "Commented on any post";
  }
}

export default ActivityLog;
