import { apiClient } from "repo/Client";
import { API } from "config";
import { RoommateAgreementResponseModel } from "models/api_responses/RoommateAgreementResponseModel";
import { RoommateAgreementRequestModel } from "models/api_requests/RoommateAgreementRequestModel";

async function fetchRoomAgreementFileds(
  requestModel: RoommateAgreementRequestModel
) {
  return apiClient.get<RoommateAgreementResponseModel>(
    API.ROOMATE_AGREEMENT_FIELDS,
    {
      limit: requestModel.limit,
      paginate: requestModel.paginate,
      order: requestModel.order,
      classLevelId: requestModel.classLevelId,
      isDefault: requestModel.isDefault
    }
  );
}

export default {
  fetchRoomAgreementFileds
};
