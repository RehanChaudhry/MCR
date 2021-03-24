import { API } from "config";
import { apiClient } from "repo/Client";
import MatchesApiRequestModel from "models/api_requests/MatchesApiRequestModel";
import ApiSuccessResponseModel from "models/api_responses/ApiSuccessResponseModel";
import MatchesApiResponseModel from "models/api_responses/MatchesApiResponseModel";

function matches(request: MatchesApiRequestModel) {
  return apiClient.get<MatchesApiResponseModel>(
    API.GET_MATCHES,
    JSON.stringify(request)
  );
}

function friendRequest(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.POST_FRIEND_REQUEST, {
    userId: userId
  });
}

function matchDismiss(userId: number) {
  return apiClient.post<ApiSuccessResponseModel>(API.DISMISS_MATCH, {
    userId: userId
  });
}

export default {
  matches,
  friendRequest,
  matchDismiss
};
