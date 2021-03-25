import { API } from "config";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { MyFriendsResponseModel } from "models/api_responses/MyFriendsResponseModel";
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

export default { getMyFriends, getMyRoommates, getDismissedOrBlocked };
