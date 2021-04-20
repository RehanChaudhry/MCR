import { API } from "config";
import CreatePostApiRequestModel from "models/api_requests/CreatePostApiRequestModel";
import { CommunityAnnouncementResponseModel } from "models/api_responses/CommunityAnnouncementResponseModel";
import { apiClient } from "repo/Client";
import AnnouncementRequestModel from "models/api_requests/AnnouncementRequestModel";
import { LikeDislikeResponseModel } from "models/api_responses/LikeDislikeResponseModel";
import CreatePostApiResponseModel from "models/api_responses/CreatePostApiResponseModel";
import CommentsRequestModel from "models/api_requests/CommentsRequestModel";
import { CommentsResponseModel } from "models/api_responses/CommentsResponseModel";
import PostCommentApiResponseModel from "models/api_responses/PostCommentApiResponseModel";
import PostCommentApiRequestModel from "models/api_requests/PostCommentApiRequestModel";

function getCommunityAnnouncements(
  requestModel: AnnouncementRequestModel
) {
  return apiClient.get<CommunityAnnouncementResponseModel>(
    API.GET_COMMUNITY_ANNOUNCEMENT,
    {
      ...requestModel
    }
  );
}

function getComments(requestModel: CommentsRequestModel) {
  return apiClient.get<CommentsResponseModel>(API.COMMENT, {
    ...requestModel
  });
}

function likeDislike(postId: number) {
  return apiClient.put<LikeDislikeResponseModel>(
    API.LIKE_DISLIKE + "/" + postId
  );
}

function createPost(request: CreatePostApiRequestModel) {
  return apiClient.post<CreatePostApiResponseModel>(
    API.CREATE_POST,
    request
  );
}

function postComment(request: PostCommentApiRequestModel) {
  return apiClient.post<PostCommentApiResponseModel>(API.COMMENT, request);
}

export default {
  createPost,
  getCommunityAnnouncements,
  likeDislike,
  getComments,
  postComment
};
