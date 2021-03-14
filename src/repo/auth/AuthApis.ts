import { API } from "config";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { apiClient } from "repo/Client";
import { UpdateAccountPasswordApiRequestModel } from "models/api_requests/UpdateAccountPasswordApiRequestModel";
import { UpdateAccountPasswordApiResponseModel } from "models/api_responses/UpdateAccountPasswordApiResponseModel";
import { CreatePasswordApiRequestModel } from "models/api_requests/CreatePasswordApiRequestModel";

function signIn(requestModel: SignInApiRequestModel) {
  return apiClient.post<SignInApiResponseModel>(
    API.LOGIN_URL,
    JSON.stringify(requestModel)
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

export default {
  signIn,
  forgotPassword,
  createOrResetPassword,
  updateAccountPassword
};
