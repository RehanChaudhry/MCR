import { API } from "config";
import { apiClient } from "repo/Client";
import { AnswerApiRequestModel } from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import { QuestionsResponseModel } from "models/api_responses/QuestionsResponseModel";
import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";

function questions() {
  return apiClient.get<QuestionsResponseModel>(API.GET_QUESTIONS);
}

function getNotifications() {
  return apiClient.get<NotificationsResponseModel>(API.NOTIFICATION_URL);
}

function answers(requestModel: AnswerApiRequestModel) {
  return apiClient.post<AnswerApiResponseModel>(
    API.POST_ANSWERS,
    JSON.stringify(requestModel)
  );
}

export default {
  questions,
  answers,
  getNotifications
};
