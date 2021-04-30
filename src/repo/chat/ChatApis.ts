import { apiClient } from "repo/Client";
import { API } from "config";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import { ConversationSuggestionsResponseModel } from "models/api_responses/ConversationSuggestionsResponseModel";
import { ConversationSuggestionsRequestModel } from "models/api_requests/ConversationSuggestionsRequestModel";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import { CreateConversationResponseModel } from "models/api_responses/CreateConversationResponseModel";

function getChats() {
  return apiClient.get<ChatsResponseModel>(
    API.CONVERSATION,
    JSON.stringify("")
  );

  /*return apiClient.get<ConversationSuggestionsResponseModel>(
      API.CONVERSATION,
      { keyword: keyword }
  );*/
}

function getSuggestions(request: ConversationSuggestionsRequestModel) {
  return apiClient.get<ConversationSuggestionsResponseModel>(
    API.UPDATE_PROFILE,
    { ...request }
  );
}

function createConversations(request: CreateConversationRequestModel) {
  return apiClient.post<CreateConversationResponseModel>(
    API.CONVERSATION,
    request
  );
}

export default {
  getChats: getChats,
  getSuggestions: getSuggestions,
  createConversations: createConversations
};
