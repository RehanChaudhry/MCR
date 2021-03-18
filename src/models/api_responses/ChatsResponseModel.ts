import ChatItem from "models/ChatItem";

export type ChatsResponseModel = {
  message: string;
  data: ChatItem[];
};
