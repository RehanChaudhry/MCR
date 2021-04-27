import { API } from "config";
import { RelationApiRequestModel } from "models/api_requests/RelationApiRequestModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { FriendRequestsResponseModel } from "models/api_responses/FriendRequestsResponseModel";
import { MyFriendsResponseModel } from "models/api_responses/MyFriendsResponseModel";
import RelationApiResponseModel from "models/api_responses/RelationApiResponseModel";
import { RoommateRequestsResponseModel } from "models/api_responses/RoommateRequestsResponseModel";
import { apiClient } from "repo/Client";

function getMyFriends(request: RelationApiRequestModel) {
  return apiClient.get<RelationApiResponseModel>(API.RELATION, {
    ...request
  });
}

function getMyRoommates() {
  return apiClient.get<MyFriendsResponseModel>(API.MY_ROOMMATES);
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
