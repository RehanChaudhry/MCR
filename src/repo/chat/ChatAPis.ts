import { apiClient } from "repo/Client";
import { API } from "config";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";

function getChats() {
  return apiClient.get<ChatsResponseModel>(
    API.GET_CHATS,
    JSON.stringify("")
  );
}

export default {
  getChats: getChats
};
