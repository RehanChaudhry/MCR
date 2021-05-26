import { API } from "config";
import { MatchDismissBlockCancelApiRequestModel } from "models/api_requests/MatchDismissBlockCancelApiRequestModel";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import { apiClient } from "repo/Client";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";

function relations(request: PaginationParamsModel) {
  return apiClient.get<RelationApiResponseModel>(API.RELATION, {
    ...request
  });
}

function matchDismiss(
  requestModel: MatchDismissBlockCancelApiRequestModel
) {
  return apiClient.put<ApiSuccessResponseModel>(
    API.DISMISS_MATCH,
    requestModel
  );
}

function matchBlocked(
  requestModel: MatchDismissBlockCancelApiRequestModel
) {
  return apiClient.put<ApiSuccessResponseModel>(
    API.BLOCKED_MATCH + requestModel.userId,
    {
      status: requestModel.status
    }
  );
}

function updateRelation(requestModel: UpdateRelationApiRequestModel) {
  return apiClient.put<UpdateRelationApiResponseModel>(
    `${API.REMOVE_FRIEND}/${requestModel.receiverId}`,
    requestModel
  );
}

function sendFriendOrRoommateRequest(
  requestModel: UpdateRelationApiRequestModel
) {
  return apiClient.post<UpdateRelationApiResponseModel>(
    `${API.POST_RELATION}`,
    requestModel
  );
}

export default {
  relations,
  matchDismiss,
  matchBlocked,
  updateRelation,
  sendFriendOrRoommateRequest
};
