export type MyFriendsResponseModel = {
  message: string;
  data: MyFriend[];
};

export enum ROOMMATE_REQUEST_STATE {
  NONE = "none",
  REQUEST_SENT = "request_sent",
  NOT_ELIGIBLE = "not_eligible"
}

export type MyFriend = {
  id: string;
  title: string;
  subtitle: string;
  profileImage: string;
  requestState: ROOMMATE_REQUEST_STATE;
};
