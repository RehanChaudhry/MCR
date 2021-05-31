import { apiClient } from "repo/Client";
import { API } from "config";
import { RoommateAgreementResponseModel } from "models/api_responses/RoommateAgreementResponseModel";
import { RoommateAgreementRequestModel } from "models/api_requests/RoommateAgreementRequestModel";
import { AgreementAnswersRequestModel } from "models/api_requests/AgreementAnswersRequestModel";
import { AgreementAnswerResponseModel } from "models/api_responses/AgreementAnswerResponseModel";

function fetchRoomAgreementFileds(
  requestModel: RoommateAgreementRequestModel
) {
  return apiClient.get<RoommateAgreementResponseModel>(
    API.ROOMATE_AGREEMENT_FIELDS,
    {
      ...requestModel
    }
  );
}

async function updateAgreement(
  requestModel?: AgreementAnswersRequestModel
) {
  return apiClient.put<AgreementAnswerResponseModel>(
    API.UPDATE_ROOMATE_AGREEMENT + "/" + requestModel!!.agreementId,
    requestModel
  );
}

async function fetchRoomAgreementAnswers(
  requestModel: RoommateAgreementRequestModel
) {
  return apiClient.get<RoommateAgreementResponseModel>(
    API.FETCH_ROOMATE_AGREEMENT_ANSWERS,
    {
      ...requestModel
    }
  );
}

export default {
  fetchRoomAgreementFileds,
  updateAgreement,
  fetchRoomAgreementAnswers
};
