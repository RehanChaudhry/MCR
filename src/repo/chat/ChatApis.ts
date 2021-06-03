import { apiClient } from "repo/Client";
import { API } from "config";
import { ConversationSuggestionsResponseModel } from "models/api_responses/ConversationSuggestionsResponseModel";
import { ConversationSuggestionsRequestModel } from "models/api_requests/ConversationSuggestionsRequestModel";
import { CreateConversationRequestModel } from "models/api_requests/CreateConversationRequestModel";
import { CreateConversationResponseModel } from "models/api_responses/CreateConversationResponseModel";
import ChatRequestModel from "models/api_requests/chatRequestModel";
import ChatResponseModel from "models/api_responses/ChatsResponseModel";
import MessagesResponseModel from "models/api_responses/MessagesResponseModel";

function getChats(request: ChatRequestModel) {
  return apiClient.get<ChatResponseModel>(API.CONVERSATION, {
    ...request
  });
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

function updateConversation(request: {
  status: string;
  conversationId: number;
}) {
  return apiClient.put<CreateConversationResponseModel>(
    API.CONVERSATION + request.conversationId,
    {
      status: request.status
    }
  );
}

function sentMessage(request: Object) {
  return apiClient.post<ChatResponseModel>(API.MESSAGE, request);
}

function getMessages(request: Object) {
  return apiClient.get<MessagesResponseModel>(API.MESSAGE, {
    ...request
  });
}

export default {
  getChats: getChats,
  getSuggestions: getSuggestions,
  createConversations: createConversations,
  sentMessage: sentMessage,
  getMessages: getMessages,
  updateConversation: updateConversation
};
