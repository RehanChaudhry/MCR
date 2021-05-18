import { API } from "config";
import { PaginationParamsModel } from "models/api_requests/PaginationParamsModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { FriendRequestsResponseModel } from "models/api_responses/FriendRequestsResponseModel";
import { MyRoommatesResponseModel } from "models/api_responses/MyRoommatesResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { RoommateRequestsResponseModel } from "models/api_responses/RoommateRequestsResponseModel";
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

function getFriendRequests() {
  return apiClient.get<FriendRequestsResponseModel>(API.FRIEND_REQUESTS);
}

function getRoommateRequests() {
  return apiClient.get<RoommateRequestsResponseModel>(
    API.ROOMMATE_REQUESTS
  );
}

export default {
  getMyFriends,
  getMyRoommates,
  getDismissedOrBlocked,
  getFriendRequests,
  getRoommateRequests
};
