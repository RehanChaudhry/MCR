import { API } from "config";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { PendingRequestsResponseModel } from "models/api_responses/PendingRequestsResponseModel";
import { MyRoommatesResponseModel } from "models/api_responses/MyRoommatesResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { apiClient } from "repo/Client";

function getMyFriends(request: PaginationParamsModel) {
  return apiClient.get<RelationApiResponseModel>(API.RELATION, {
    ...request
  });
}

function getMyRoommates() {
  return apiClient.get<MyRoommatesResponseModel>(API.MY_ROOMMATES);
}

function getDismissedOrBlocked() {
  return apiClient.get<DismissedOrBlockedResponseModel>(
    API.DISMISSED_OR_BLOCKED
  );
}

function getFriendsRequests(requestModel: PaginationParamsModel) {
  return apiClient.get<PendingRequestsResponseModel>(API.FRIEND_REQUESTS, {
    ...requestModel
  });
}

function getRoommateRequests(requestModel: PaginationParamsModel) {
  return apiClient.get<PendingRequestsResponseModel>(
    API.ROOMMATE_REQUESTS,
    {
      ...requestModel
    }
  );
}

export default {
  getMyFriends,
  getMyRoommates,
  getDismissedOrBlocked,
  getFriendsRequests,
  getRoommateRequests
};
