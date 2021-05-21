import { API } from "config";
import { MatchDismissBlockApiRequestModel } from "models/api_requests/MatchDismissBlockApiRequestModel";
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

function matchDismiss(requestModel: MatchDismissBlockApiRequestModel) {
  return apiClient.put<ApiSuccessResponseModel>(
    API.DISMISS_MATCH + requestModel.userId,
    {
      status: requestModel.status
    }
  );
}

function matchBlocked(requestModel: MatchDismissBlockApiRequestModel) {
  return apiClient.put<ApiSuccessResponseModel>(
    API.BLOCKED_MATCH + requestModel.userId,
    {
      status: requestModel.status
    }
  );
}

export default {
  relations,
  postRelation,
  matchDismiss,
  matchBlocked
};
