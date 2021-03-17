export type ChatItem = {
  id: number;
  name: string[];
  image: string;
  message: string;
  type: SenderType;
  createdAt: string;
  updatedAt: string;
};

export enum SenderType {
  STAFF = "STAFF",
  NEW_MESSAGES = "NEW_MESSAGES",
  STUDENTS = "STUDENTS"
}

export default ChatItem;
