import Message from "models/Message";

class MessagesResponseModel {
  message: string = "Success";
  data?: Message[];

  constructor(message: string, data?: Message[]) {
    this.message = message;
    this.data = data;
  }
}

export default MessagesResponseModel;
