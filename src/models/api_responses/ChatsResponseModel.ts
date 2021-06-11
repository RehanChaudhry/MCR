import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import { User } from "models/User";
import Message from "models/Message";

export class Conversation {
  id!: number;
  userType!: string;
  lastMessagedAt!: Date;
  createdBy!: number;
  createdAt!: Date;
  updatedAt!: Date;
  currentUser!: User[];
  conversationUsers!: User[];
  message!: Message[] | null;

  constructor(activityLog: Conversation) {
    Object.assign(this, activityLog);
  }

  isMessageRead = () => {
    let prettyDateTime = new PrettyTimeFormat();
    /* this.isRead = prettyDateTime.isOneDayAgo(
      this.lastMessagedAt.toString()
    );*/
    return prettyDateTime.isOneDayAgo(this.lastMessagedAt.toString());
  };
}

class ChatResponseModel {
  message: string = "Success";
  data?: Conversation[];

  constructor(message: string, data?: Conversation[]) {
    this.message = message;
    this.data = data;
  }
}

export default ChatResponseModel;
