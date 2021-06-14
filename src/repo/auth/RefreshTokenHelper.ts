import { create } from "apisauce";
import { API } from "config";
import { RefreshApiResponseModel } from "models/api_responses/RefreshApiResponseModel";
import { UserModel } from "models/api_responses/UserModel";
import AuthStorage from "repo/auth/AuthStorage";
import { AppLog } from "utils/Util";

const REFRESH_TOKEN_API = "auth/refresh-token";

function isTokenExpired(accessToken: string, expiresIn: string) {
  let threshold = 3600 * 1000;
  let future = new Date(expiresIn).getTime();
  let current = Date.now();
  let isTokenGonnaExpire = future + threshold < current;

  AppLog.log(() => "expiresIn: " + expiresIn);
  AppLog.log(() => "expiresIn (ms): " + future);
  AppLog.log(() => "currentTime (ms): " + current);
  AppLog.log(() => "Is token gonna expire soon: " + isTokenGonnaExpire);
  AppLog.log(
    () =>
      "Token gonna expire in: " +
      Math.round((future - current) / (1000 * 60 * 60)) +
      " hours"
  );

  return isTokenGonnaExpire;
}

const refreshTokenApiClient = create({
  baseURL: API.BASE_URL + API.API_URL
});

export async function extractAndRefreshTokenIfExpire(
  onFail?: () => void
): Promise<string | undefined> {
  const userToken = await AuthStorage.getUserToken();
  const user = await AuthStorage.getUser();
  if (!user || !userToken) {
    return undefined;
  }

  const { accessToken, refreshToken, expiresIn } = userToken;

  if (!isTokenExpired(accessToken, expiresIn)) {
    return accessToken;
  }

  AppLog.log(() => "Token expired...");

  const response = await refreshTokenApiClient.post(
    REFRESH_TOKEN_API,
    {
      token: refreshToken
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  let updateUser: UserModel;
  if (!response.ok) {
    AppLog.log(() => "Failed to refresh token...");
    onFail?.();
    return undefined;
  } else {
    try {
      let dataBody = response.data;
      if (dataBody === undefined) {
        AppLog.log(() => "Failed to refresh token...");
        onFail?.();
        return undefined;
      }
      let refreshApiResponseModel = dataBody as RefreshApiResponseModel;
      let userProfile = user.profile;

      updateUser = {
        authentication: {
          accessToken: refreshApiResponseModel.token.accessToken,
          refreshToken: refreshApiResponseModel.token.refreshToken,
          expiresIn: refreshApiResponseModel.token.tokenExpirationDate
        },
        profile: userProfile
      };

      await AuthStorage.storeUser(updateUser);

      AppLog.log(
        () =>
          "Updated Refreshed Access Token: " +
          updateUser.authentication?.accessToken
      );
    } catch (e) {
      AppLog.log(() => "Failed to refresh token...");
      AppLog.log(() => e);
      onFail?.();
      return undefined;
    }

    return updateUser.authentication?.accessToken;
  }
}
