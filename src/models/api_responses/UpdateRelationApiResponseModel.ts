export interface UpdateRelationApiResponseModel {
  message: string;
  data: Data;
}

export interface Data {
  id: number;
  userId1: number;
  userId2: number;
  isFriend: boolean;
  isRoommate: boolean;
  status: String;
  createdAt: String;
  updatedAt: String;
}
