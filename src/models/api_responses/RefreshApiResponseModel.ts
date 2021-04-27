export type RefreshApiResponseModel = {
  token: Data;
};

export type Data = {
  accessToken: string;
  refreshToken: string;
  tokenExpirationDate: string;
};
