import { API } from "config";
import { CreatePostApiRequestModel } from "models/api_requests/CreatePostApiRequestModel";
import { CommunityAnnouncementResponseModel } from "models/api_responses/CommunityAnnouncementResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { apiClient } from "repo/Client";

function getCommunity() {
  return apiClient.get<CommunityAnnouncementResponseModel>(
    API.GET_COMMUNITY
  );
}

function createPost(requestModel: CreatePostApiRequestModel) {
  return apiClient.post<SignInApiResponseModel>(
    API.CREATE_POST,
    JSON.stringify(requestModel)
  );
}

export default {
  getCommunity,
  createPost
};
