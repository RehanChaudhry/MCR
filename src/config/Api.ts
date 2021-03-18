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

  // Profile
  GET_QUESTIONS: "questions/",
  POST_ANSWERS: "answer/",

  //community
  GET_COMMUNITY: "community/",
  //chat
  GET_CHATS: "chats"
};
