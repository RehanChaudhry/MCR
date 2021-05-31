export interface CreateConversationResponseModel {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  userType: string;
  createdBy: number;
  lastMessagedAt: Date;
  updatedAt: Date;
  createdAt: Date;
}
