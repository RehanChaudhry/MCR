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
  message!: Message[];
  status!: string;

  constructor(conversation: Conversation) {
    Object.assign(this, conversation);
  }

  isMessageComesToday() {
    let DateFormatter = new PrettyTimeFormat("m ago");

    return (
      this.lastMessagedAt !== undefined &&
      DateFormatter.isSameDay(this.lastMessagedAt.toString())
    );
  }

  getFormattedDate() {
    let DateFormatter = new PrettyTimeFormat("m ago");

    /*this.isMessageComesToday()
      ? DateFormatter.formatTime(this.lastMessagedAt.toString())
      :*/

    return DateFormatter.getPrettyTime(
      this.lastMessagedAt !== undefined
        ? this.lastMessagedAt.toString()
        : ""
    );
  }
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
