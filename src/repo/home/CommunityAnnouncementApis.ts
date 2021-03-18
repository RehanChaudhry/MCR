import { API } from "config";
import { CommunityResponseModel } from "models/api_responses/CommunityResponseModel";
import { apiClient } from "repo/Client";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getCommunity() {
  return apiClient.get<CommunityResponseModel>(API.GET_COMMUNITY);
}
