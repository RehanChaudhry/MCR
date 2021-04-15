import { API } from "config";
import { CreatePostApiRequestModel } from "models/api_requests/CreatePostApiRequestModel";
import { CommunityAnnouncementResponseModel } from "models/api_responses/CommunityAnnouncementResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import { apiClient } from "repo/Client";
import AnnouncementRequestModel from "models/api_requests/AnnouncementRequestModel";
import { LikeDislikeResponseModel } from "models/api_responses/LikeDislikeResponseModel";

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

function getAnnouncements(requestModel: AnnouncementRequestModel) {
  return apiClient.get<CommunityAnnouncementResponseModel>(
    API.GET_ANNOUNCEMENT,
    JSON.stringify(requestModel)
  );
}

function likeDislike(postId: number) {
  return apiClient.put<LikeDislikeResponseModel>(
    API.LIKE_DISLIKE + "/" + postId
  );
}

export default {
  getCommunity,
  createPost,
  getAnnouncements,
  likeDislike
};
