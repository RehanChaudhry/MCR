import { API } from "config";
import { apiClient } from "repo/Client";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";

function relations(request: PaginationParamsModel) {
  return apiClient.get<RelationApiResponseModel>(API.RELATION, {
    ...request
  });
}

function postRelation(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.POST_RELATION, {
    receiverId: userId
  });
}

function matchDismiss(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.DISMISS_MATCH, {
    userId: userId
  });
}

export default {
  relations,
  postRelation,
  matchDismiss
};
