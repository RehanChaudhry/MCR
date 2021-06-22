import { API } from "config";
import CreatePostApiRequestModel from "models/api_requests/CreatePostApiRequestModel";
import ReportContentApiRequestModel from "models/api_requests/ReportContentApiRequestModel";
import { CommunityAnnouncementResponseModel } from "models/api_responses/CommunityAnnouncementResponseModel";
import ReportContentApiResponseModel from "models/api_responses/ReportContentApiResponseModel";
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

function getSingleCommunityAnnouncements(postId: number) {
  return apiClient.get<CommunityAnnouncementResponseModel>(
    API.GET_COMMUNITY_ANNOUNCEMENT,
    { postId }
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

function postReportContent(request: ReportContentApiRequestModel) {
  return apiClient.post<ReportContentApiResponseModel>(
    API.REPORT_CONTENT,
    request
  );
}

export default {
  createPost,
  getCommunityAnnouncements,
  likeDislike,
  getComments,
  postComment,
  postReportContent,
  getSingleCommunityAnnouncements
};
