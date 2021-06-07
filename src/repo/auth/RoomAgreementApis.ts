import { apiClient } from "repo/Client";
import { API } from "config";
import { RoommateAgreementResponseModel } from "models/api_responses/RoommateAgreementResponseModel";
import { RoommateAgreementRequestModel } from "models/api_requests/RoommateAgreementRequestModel";
import { AgreementAnswersRequestModel } from "models/api_requests/AgreementAnswersRequestModel";
import { AgreementAnswerResponseModel } from "models/api_responses/AgreementAnswerResponseModel";
import { GetAgreementApi } from "models/api_requests/GetAgreementApi";

function fetchRoomAgreementFields(
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

async function getAgreement(agreementId: number) {
  return apiClient.get<GetAgreementApi>(
    API.UPDATE_ROOMATE_AGREEMENT + "/" + agreementId
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
  fetchRoomAgreementFields,
  updateAgreement,
  fetchRoomAgreementAnswers,
  getAgreement
};
