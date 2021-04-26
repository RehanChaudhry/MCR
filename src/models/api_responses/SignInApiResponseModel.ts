export type SignInApiResponseModel = {
  message: string;
  data: Authentication;
};

export type Authentication = {
  accessToken: string;
  refreshToken: string;
};
