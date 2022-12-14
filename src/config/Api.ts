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
  CONTACT_US: "contact-us",
  FETCH_MY_PROFILE_URL: "user/me?meta=true",
  FORGOT_PASS_URL: "password/request",
  RESET_PASS_URL: "password/set/",
  COMPLETE_PROFILE_QUERY_PARAMS: "completingProfile=true",
  MY_PROFILE: "user/me",
  USER: "user",
  NOTIFICATION_URL: "notification",
  AGREEMENT_DETAILS: "agreement_details",
  ROOMATE_AGREEMENT_FIELDS: "agreement-field",
  UPDATE_ROOMATE_AGREEMENT: "agreement-answer",
  FETCH_ROOMATE_AGREEMENT_ANSWERS: "agreement-answer",

  //Get universities
  UNIS: "university",
  UNI_DETAILS: "university/",
  GET_SSO_URL: "university/login-url",

  // Profile
  GET_QUESTIONS: "answer/",
  POST_ANSWERS: "answer/",
  // GET_ACTIVITY_LOGS: "activity-logs/",
  GET_USERS: "user",
  GET_ACTIVITY_LOGS: "log",
  // UPDATE_PROFILE: "user/",

  // matches
  DISMISS_MATCH: "relation/dismissed/",
  GET_MATCHES_FILTER_COUNT: "matches-count",
  BLOCKED_MATCH: "relation/",
  MATCH_INFO: "user/matching-information",
  MATCH_GENDER: "gender",

  //community, announcements
  CREATE_POST: "post",
  GET_COMMUNITY_ANNOUNCEMENT: "post",
  LIKE_DISLIKE: "post/like",
  COMMENT: "comment",
  REPORT_CONTENT: "spam",
  GET_LIKES: "post/likedBy",

  //chat
  CONVERSATION: "conversation/",
  //message
  MESSAGE: "message/",

  //relations
  RELATION: "relation",
  MATCHES: "/matches",
  RELATION_DISMISS_RESTORE: "relation/dismissed",
  MY_ROOMMATES: "myroommates",
  DISMISSED_OR_BLOCKED: "relation/dismiss",
  FRIEND_REQUESTS: "relation/pending/friends",
  ROOMMATE_REQUESTS: "relation/pending/roommates",
  RELATION_RESTORE: "relation/restored",

  // others
  GET_NOTIFICATIONS_COUNT: "notification/unread",
  GET_STATIC_CONTENT: "static-content/",
  GET_SIGNED_URL: "file/upload-image",
  LEAVE_GROUP: "agreement/leave"
};
