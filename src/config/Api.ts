import Env from "envs/env";

export default {
  // dev: abcxyz-dev.cygnis.dev
  // qa: abcxyz-qa.cygnis.dev
  // staging: abcxyz.cygnis.dev
  //
  // prod: abcxyz.com

  BASE_URL: Env.BASE_URL,
  API_URL: "api/",
  LOGIN_URL: "auth/login",
  FETCH_MY_PROFILE_URL: "user/me?meta=true",
  FORGOT_PASS_URL: "password/request/",
  RESET_PASS_URL: "password/set/",
  UPDATE_ACCOUNT_PASSWORD_URL: "user/me",
  NOTIFICATION_URL: "notifications",
  AGREEMENT_DETAILS: "agreement_details",
  ROOMATE_AGREEMENT_FIELDS: "agreement-field",
  UPDATE_ROOMATE_AGREEMENT: "agreement-answer",
  FETCH_ROOMATE_AGREEMENT_ANSWERS: "agreement-answer",

  //Get universities
  UNIS: "university",

  // Profile
  GET_QUESTIONS: "question/",
  GET_ANSWERS: "answer/",
  POST_ANSWERS: "answer/",
  // GET_ACTIVITY_LOGS: "activity-logs/",
  UPDATE_PROFILE: "user",
  GET_ACTIVITY_LOGS: "log",
  // UPDATE_PROFILE: "user/",

  //community, announcements
  CREATE_POST: "post",
  GET_COMMUNITY_ANNOUNCEMENT: "post",
  LIKE_DISLIKE: "post/like",
  COMMENT: "comment",
  REPORT_CONTENT: "spam",

  //chat
  CONVERSATION: "conversation/",
  //message
  MESSAGE: "message/",

  //relations
  RELATION: "relation",
  RELATION_DISMISS_RESTORE: "relation/dismissed",
  MY_ROOMMATES: "myroommates",
  DISMISSED_OR_BLOCKED: "relation/dismiss",
  FRIEND_REQUESTS: "relation/pending/friends",
  ROOMMATE_REQUESTS: "relation/pending/roommates",

  // others
  GET_STATIC_CONTENT: "static-content/",
  GET_SIGNED_URL: "file/upload-image"
};
