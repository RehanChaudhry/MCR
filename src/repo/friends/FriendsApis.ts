import { API } from "config";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { FriendRequestsResponseModel } from "models/api_responses/FriendRequestsResponseModel";
import { MyFriendsResponseModel } from "models/api_responses/MyFriendsResponseModel";
import { RoommateRequestsResponseModel } from "models/api_responses/RoommateRequestsResponseModel";
import { apiClient } from "repo/Client";

function getMyFriends() {
  return apiClient.get<MyFriendsResponseModel>(API.MY_FRIENDS);
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
