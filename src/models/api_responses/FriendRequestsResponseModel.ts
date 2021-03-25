export type FriendRequestsResponseModel = {
  message: string;
  data: FriendRequest[];
};

export type FriendRequest = {
  id: string;
  title: string;
  subtitle: string;
  profileImage: string;
};
