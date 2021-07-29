import { Conversation } from "models/api_responses/ChatsResponseModel";

class ConversationByIdResponseModel {
  message: string = "Success";
  data?: Conversation;

  constructor(message: string, data?: Conversation) {
    this.message = message;
    this.data = data;
  }
}

export default ConversationByIdResponseModel;
