import { ProfilePicture } from "models/api_responses/CommentsResponseModel";

export type ConversationSuggestionsResponseModel = {
  message: string;
  data: User[];
};

export interface User {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  profilePicture: ProfilePicture;
  conversationId: number;
  status: Status;
  createdAt: Date;
  updatedAt: Date;
}

export enum Status {
  Active = "active"
}
