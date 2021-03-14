import { ApiResponse, create } from "apisauce";
import { API } from "config";
import { ApiErrorResponseModel } from "models/api_responses/ApiErrorResponseModel";
import { useState } from "react";
import AuthStorage from "repo/auth/AuthStorage";
import { useAuth } from "hooks";
import { AppLog } from "utils/Util";

export const apiClient = create({
  baseURL: API.BASE_URL + API.API_URL
});

resetApiClient();

export function resetApiClient(providedAuthToken?: string) {
  apiClient.addAsyncRequestTransform(async (request) => {
    request.headers.accept = "application/json";

    const authToken =
      providedAuthToken ?? (await AuthStorage.getUserToken());
    if (__DEV__) {
      AppLog.logForcefully("Authorization Token: " + authToken);
    }

    if (authToken === undefined) {
      return;
    }
    request.headers.Authorization = "Bearer " + authToken;
  });
}

export const useApi = <
  T,
  U,
  V extends ApiErrorResponseModel = ApiErrorResponseModel
>(
  apiFunc: (...args: T[]) => Promise<ApiResponse<U, V>>
) => {
  const [data, setData] = useState<U | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

  type RequestReturnType =
    | {
        hasError: false;
        errorBody?: undefined;
        dataBody: U;
      }
    | {
        hasError: true;
        errorBody: string;
        dataBody?: undefined;
      };

  const request = async (args: T[]): Promise<RequestReturnType> => {
    setLoading(true);
    setError(undefined);

    if (__DEV__) {
      AppLog.logForcefully("Request Body:");
      AppLog.logForcefully(args);
    }

    let response;
    try {
      response = await apiFunc(...args);
    } catch (e) {
      AppLog.bug("Error while calling apiFunc(...args): ");
      AppLog.bug(e);
    }

    if (__DEV__) {
      AppLog.logForcefully("Response Body:");
      AppLog.logForcefully(
        response?.config?.url + ": " + JSON.stringify(response)
      );
    }

    setLoading(false);

    if (!response?.ok) {
      // move user to login screen if the token has expired
      let errorBody: string;
      if (response?.status === 401) {
        errorBody = "Token expired";
        auth.logOut();
      } else {
        errorBody =
          response?.data?.message ??
          response?.originalError?.message ??
          "An unexpected error occurred.";
      }

      setError(errorBody);
      return { hasError: true, errorBody };
    } else {
      let dataBody = response.data;
      if (dataBody === undefined) {
        return { hasError: true, errorBody: "Empty data" };
      }
      setData(dataBody);
      return { hasError: false, dataBody };
    }
  };

  return { data, error, loading, request };
};

export default { apiClient, useApi };
