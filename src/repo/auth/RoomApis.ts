import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import { UpdateRelationApiResponseModel } from "models/api_responses/UpdateRelationApiResponseModel";
import { apiClient } from "repo/Client";
import { API } from "config";
import { RoommateAgreementResponseModel } from "models/api_responses/RoommateAgreementResponseModel";
import { RoommateAgreementRequestModel } from "models/api_requests/RoommateAgreementRequestModel";

function fetchRoomAgreementFileds(
  requestModel: RoommateAgreementRequestModel
) {
  return apiClient.get<RoommateAgreementResponseModel>(
    API.ROOMATE_AGREEMENT_FIELDS,
    requestModel
  );
}

function updateRelation(requestModel: UpdateRelationApiRequestModel) {
  return apiClient.put<UpdateRelationApiResponseModel>(
    `${API.REMOVE_FRIEND}/${requestModel.recieverId}`,
    requestModel
  );
}

function sendFriendOrRoommateRequest(
  requestModel: UpdateRelationApiRequestModel
) {
  return apiClient.post<UpdateRelationApiResponseModel>(
    `${API.REMOVE_FRIEND}/${requestModel.recieverId}`,
    requestModel
  );
}

export default {
  fetchRoomAgreementFileds,
  updateRelation,
  sendFriendOrRoommateRequest
};
