import { ApiResponse, create } from "apisauce";
import { API } from "config";
import { ApiErrorResponseModel } from "models/api_responses/ApiErrorResponseModel";
import { useState } from "react";
import { useAuth } from "hooks";
import { AppLog } from "utils/Util";
import { extractAndRefreshTokenIfExpire } from "./auth/RefreshTokenHelper";

export const apiClient = create({
  baseURL: API.BASE_URL + API.API_URL
});

resetApiClient();

export function resetApiClient(providedAuthToken?: string) {
  AppLog.log("Resetting Authorization Token...");
  // clear all transforms
  apiClient.asyncRequestTransforms.length = 0;
  // add new transform
  apiClient.addAsyncRequestTransform(async (request) => {
    request.headers.accept = "application/json";

    let token =
      providedAuthToken ?? (await extractAndRefreshTokenIfExpire());

    AppLog.log("Access Token: " + token);

    if (token === undefined) {
      return;
    }
    request.headers.Authorization = "Bearer " + token;
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

    AppLog.logForcefully("Request Body:");
    AppLog.logForcefully(args);

    let response: any;
    try {
      response = await apiFunc(...args);
    } catch (e) {
      AppLog.bug("Error while calling apiFunc(...args): ");
      AppLog.bug(e);
    }

    AppLog.logForcefully("Response Body:");
    AppLog.logForcefullyForComplexMessages(
      () => response?.config?.url + ": " + JSON.stringify(response)
    );

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

      try {
        return { hasError: true, errorBody };
      } finally {
        setError(errorBody);
        setLoading(false);
      }
    } else {
      let dataBody = response.data;
      if (dataBody === undefined) {
        try {
          return { hasError: true, errorBody: "Empty data" };
        } finally {
          setError("Empty data");
          setLoading(false);
        }
      }

      try {
        return { hasError: false, dataBody };
      } finally {
        setData(dataBody);
        setLoading(false);
      }
    }
  };

  return { data, error, loading, request };
};

export default { apiClient, useApi };
