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
  FETCH_MY_PROFILE_URL: "user/me",
  FORGOT_PASS_URL: "password/request/",
  RESET_PASS_URL: "password/set/",
  UPDATE_PROFILE_URL: "profile",
  NOTIFICATION_URL: "notifications",
  AGREEMENT_DETAILS: "agreement_details",

  //Get universities
  UNIS: "university",

  // Profile
  GET_QUESTIONS: "question/",
  GET_ANSWERS: "answer/",
  POST_ANSWERS: "answer/",
  GET_ACTIVITY_LOGS: "activity-logs/",

  // matches
  GET_MATCHES: "matches",
  POST_FRIEND_REQUEST: "friend-request",
  DISMISS_MATCH: "dismiss-match",
  GET_MATCHES_FILTER_COUNT: "matches-count",

  //community, announcements
  CREATE_POST: "post",
  GET_COMMUNITY_ANNOUNCEMENT: "post",
  LIKE_DISLIKE: "post/like",
  GET_COMMENTS: "comment",

  //chat
  GET_CHATS: "chats",

  //relations
  RELATION: "relation",
  // MY_FRIENDS: "myfriends",
  MY_ROOMMATES: "myroommates",
  DISMISSED_OR_BLOCKED: "dismissedorblocked",
  FRIEND_REQUESTS: "friendrequests",
  ROOMMATE_REQUESTS: "roommaterequests"
};
