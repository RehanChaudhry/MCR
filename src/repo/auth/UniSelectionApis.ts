import { API } from "config";
import FetchUniDetailsRequestModel from "models/api_requests/FetchUniDetailsRequestModel";
import { FetchUniDetailsResponseModel } from "models/api_responses/FetchUniDetailsResponseModel";
import { UniSelectionResponseModel } from "models/api_responses/UniSelectionResponseModel";
import { apiClient } from "repo/Client";

function getUnis() {
  return apiClient.get<UniSelectionResponseModel>(API.UNIS);
}

function getUniDetails(requestModel: FetchUniDetailsRequestModel) {
  return apiClient.get<FetchUniDetailsResponseModel>(
    API.UNI_DETAILS + requestModel.name
  );
}

function getSSOUrl() {
  return apiClient.get<Object>(API.GET_SSO_URL);
}

export default { getUnis, getUniDetails, getSSOUrl };
