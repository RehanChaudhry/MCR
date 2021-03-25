export type RoommateRequestsResponseModel = {
  message: string;
  data: RoomateRequest[];
};

export type RoomateRequest = {
  id: string;
  title: string;
  subtitle: string;
  profileImage: string;
};
