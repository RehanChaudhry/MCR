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
  FORGOT_PASS_URL: "password/request/",
  RESET_PASS_URL: "password/set/",
  UPDATE_PROFILE_URL: "profile",
  NOTIFICATION_URL: "notifications",

  //Get universities
  UNIS: "unis",

  // Profile
  GET_QUESTIONS: "questions/",
  POST_ANSWERS: "answer/",

  // matches
  GET_MATCHES: "matches",
  POST_FRIEND_REQUEST: "friend-request",
  DISMISS_MATCH: "dismiss-match",
  GET_MATCHES_FILTER_COUNT: "matches-count",

  //community
  GET_COMMUNITY: "community/",
  CREATE_POST: "createPost/",
  //chat
  GET_CHATS: "chats"
};
