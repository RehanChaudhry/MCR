import { Conversation } from "models/api_responses/ChatsResponseModel";

export interface CreateConversationResponseModel {
  message: string;
  data: Conversation;
}
