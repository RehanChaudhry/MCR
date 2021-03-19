export type ChatItem = {
  id: number;
  name: string[];
  image: string;
  message: string;
  type: SenderType;
  userId: number;
  isMessageRead: boolean;
  createdAt: string;
  updatedAt: string;
};

export enum SenderType {
  STAFF = "STAFF",
  NEW_MESSAGES = "NEW MESSAGES",
  STUDENTS = "STUDENTS"
}

export default ChatItem;
