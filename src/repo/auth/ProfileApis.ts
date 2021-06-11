import { API } from "config";
import { apiClient } from "repo/Client";
import { AnswerApiRequestModel } from "models/api_requests/AnswerApiRequestModel";
import { AnswerApiResponseModel } from "models/api_responses/AnswerApiResponseModel";
import QuestionsResponseModel from "models/api_responses/QuestionsResponseModel";
import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";
import ActivityLogApiRequestModel from "models/api_requests/ActivityLogApiRequestModel";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import { MatchInfoApiResponseModel } from "models/api_responses/MatchInfoApiResponseModel";
import { NotificationApiRequestModel } from "models/api_requests/NotificationApiRequestModel";

function questions() {
  return apiClient.get<QuestionsResponseModel>(API.GET_QUESTIONS);
}

function getNotifications(requestModel: NotificationApiRequestModel) {
  return apiClient.get<NotificationsResponseModel>(API.NOTIFICATION_URL, {
    ...requestModel
  });
}

function getMatchInfo() {
  return apiClient.get<MatchInfoApiResponseModel>(API.MATCH_INFO);
}

function answers(requestModel: AnswerApiRequestModel) {
  return apiClient.post<AnswerApiResponseModel>(
    API.POST_ANSWERS,
    JSON.stringify(requestModel)
  );
}

function activityLogs(requestModel: ActivityLogApiRequestModel) {
  return apiClient.get<ActivityLogsResponseModel>(API.GET_ACTIVITY_LOGS, {
    ...requestModel
  });
}

export default {
  questions,
  answers,
  getNotifications,
  activityLogs,
  getMatchInfo
};
