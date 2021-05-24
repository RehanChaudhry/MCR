import { API } from "config";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { apiClient, resetApiClient } from "repo/Client";
import { UpdateAccountPasswordApiRequestModel } from "models/api_requests/UpdateAccountPasswordApiRequestModel";
import { UpdateAccountPasswordApiResponseModel } from "models/api_responses/UpdateAccountPasswordApiResponseModel";
import { CreatePasswordApiRequestModel } from "models/api_requests/CreatePasswordApiRequestModel";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { UpdateProfileUiResponseModel } from "models/api_responses/UpdateProfileUiResponseModel";
import { UpdateProfileUiRequestModel } from "models/api_requests/UpdateProfileUiRequestModel";

function signIn(requestModel: SignInApiRequestModel) {
  return apiClient.post<SignInApiResponseModel>(
    API.LOGIN_URL,
    JSON.stringify(requestModel)
  );
}

async function fetchMyProfile(token?: string) {
  if (token) {
    await resetApiClient(token);
  }
  return apiClient.get<FetchMyProfileResponseModel>(
    API.FETCH_MY_PROFILE_URL
  );
}

function forgotPassword(requestModel: ForgotPasswordApiRequestModel) {
  return apiClient.post<ForgotPasswordApiResponseModel>(
    API.FORGOT_PASS_URL,
    JSON.stringify(requestModel)
  );
}

function createOrResetPassword(
  requestModel: CreatePasswordApiRequestModel
) {
  return apiClient.put<SignInApiResponseModel>(
    API.RESET_PASS_URL + requestModel.token,
    JSON.stringify(requestModel)
  );
}

function updateAccountPassword(
  requestModel: UpdateAccountPasswordApiRequestModel
) {
  return apiClient.put<UpdateAccountPasswordApiResponseModel>(
    API.UPDATE_PROFILE_URL,
    JSON.stringify(requestModel)
  );
}

function updateProfile(requestModel: UpdateProfileUiRequestModel) {
  return apiClient.put<UpdateProfileResponseModel>(
    API.UPDATE_PROFILE + "/" + "me",
    JSON.stringify(requestModel)
  );
}

function updateProfileUi() {
  return apiClient.get<UpdateProfileUiResponseModel>(
    API.UPDATE_PROFILE + "/" + "me?meta=true"
  );
}

export default {
  signIn,
  fetchMyProfile,
  forgotPassword,
  createOrResetPassword,
  updateAccountPassword,
  updateProfile,
  updateProfileUi
};
