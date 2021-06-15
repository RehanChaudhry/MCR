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
  FORGOT_PASS_URL: "password/request",
  RESET_PASS_URL: "password/set/",
  COMPLETE_PROFILE_QUERY_PARAMS: "completingProfile=true",
  MY_PROFILE: "user/me",
  NOTIFICATION_URL: "notification",
  AGREEMENT_DETAILS: "agreement_details",
  ROOMATE_AGREEMENT_FIELDS: "agreement-field",
  UPDATE_ROOMATE_AGREEMENT: "agreement-answer",
  FETCH_ROOMATE_AGREEMENT_ANSWERS: "agreement-answer",

  //Get universities
  UNIS: "university",

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
  MATCHES: "/matches",
  RELATION_DISMISS_RESTORE: "relation/dismissed",
  MY_ROOMMATES: "myroommates",
  DISMISSED_OR_BLOCKED: "relation/dismiss",
  FRIEND_REQUESTS: "relation/pending/friends",
  ROOMMATE_REQUESTS: "relation/pending/roommates",
  RELATION_RESTORE: "relation/restored",

  // others
  GET_STATIC_CONTENT: "static-content/",
  GET_SIGNED_URL: "file/upload-image"
};
