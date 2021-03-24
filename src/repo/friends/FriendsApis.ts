import { API } from "config";
import { MyFriendsResponseModel } from "models/api_responses/MyFriendsResponseModel";
import { apiClient } from "repo/Client";

function getMyFriends() {
  return apiClient.get<MyFriendsResponseModel>(API.MY_FRIENDS);
}

export default { getMyFriends };
