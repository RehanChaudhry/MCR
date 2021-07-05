import { API } from "config";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { apiClient, resetApiClient } from "repo/Client";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import { CreatePasswordApiRequestModel } from "models/api_requests/CreatePasswordApiRequestModel";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { ContactUsApiRequestModel } from "models/api_requests/ContactUsApiRequestModel";

function signIn(requestModel: SignInApiRequestModel) {
  return apiClient.post<SignInApiResponseModel>(
    API.LOGIN_URL,
    JSON.stringify(requestModel)
  );
}
function contactUs(requestModel: ContactUsApiRequestModel) {
  return apiClient.post<any>(API.CONTACT_US, JSON.stringify(requestModel));
}

async function fetchMyProfile(token?: string) {
  if (token) {
    resetApiClient(token);
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

function updateProfile(requestModel: UpdateProfileRequestModel) {
  let { queryParams, ...body } = requestModel;
  return apiClient.put<UpdateProfileResponseModel>(
    API.MY_PROFILE + (queryParams ? `?${queryParams}` : ""),
    JSON.stringify(body)
  );
}

export default {
  signIn,
  fetchMyProfile,
  forgotPassword,
  createOrResetPassword,
  updateProfile,
  contactUs
};
