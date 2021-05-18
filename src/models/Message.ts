import { ProfilePicture } from "models/User";

export interface Message {
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: ProfilePicture;
  text: string;
  id?: number;
  conversationId?: number;
  createdAt: string;
  deletedAt: string;
  updatedAt: string;
}

export default Message;
