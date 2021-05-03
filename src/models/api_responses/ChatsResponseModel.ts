import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import { User } from "models/User";

export class Conversation {
  id!: number;
  userType!: string;
  lastMessagedAt!: Date;
  createdBy!: number;
  createdAt!: Date;
  updatedAt!: Date;
  conversationUsers!: User[];
  message!: any[];
  isRead!: boolean;

  constructor(activityLog: Conversation) {
    this.isRead = false;
    Object.assign(this, activityLog);
  }

  isMessageRead = () => {
    let prettyDateTime = new PrettyTimeFormat();
    this.isRead = prettyDateTime.isOneDayAgo(
      this.lastMessagedAt.toString()
    );
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
