import { API } from "config";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import { apiClient } from "repo/Client";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import RelationFilterType from "models/enums/RelationFilterType";

function relations(request: PaginationParamsModel) {
  return apiClient.get<RelationApiResponseModel>(
    API.RELATION +
      (request.type === RelationFilterType.MATCHES ? API.MATCHES : ""),
    {
      ...request
    }
  );
}

function sendFriendOrRoommateRequest(
  requestModel: UpdateRelationApiRequestModel
) {
  return apiClient.post<UpdateRelationApiResponseModel>(
    API.RELATION,
    requestModel
  );
}

function relationDismissRestore(
  requestModel: UpdateRelationApiRequestModel
) {
  return apiClient.put<ApiSuccessResponseModel>(
    `${API.RELATION_DISMISS_RESTORE}/${requestModel.receiverId}`,
    requestModel
  );
}

function updateRelation(requestModel: UpdateRelationApiRequestModel) {
  return apiClient.put<UpdateRelationApiResponseModel>(
    requestModel.status === "dismissed" ||
      requestModel.status === "restored"
      ? `${API.RELATION_DISMISS_RESTORE}/${requestModel.receiverId}`
      : `${API.RELATION}/${requestModel.receiverId}`,
    requestModel
  );
}

export default {
  relations,
  relationDismissRestore,
  updateRelation,
  sendFriendOrRoommateRequest
};
