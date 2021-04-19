import { API } from "config";
import { apiClient } from "repo/Client";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { RelationApiRequestModel } from "models/api_requests/RelationApiRequestModel";

function relations(request: RelationApiRequestModel) {
  return apiClient.get<RelationApiResponseModel>(
    API.RELATION,
    JSON.stringify(request)
  );
}

function friendRequest(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.POST_FRIEND_REQUEST, {
    userId: userId
  });
}

function matchDismiss(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.DISMISS_MATCH, {
    userId: userId
  });
}

export default {
  relations,
  friendRequest,
  matchDismiss
};
