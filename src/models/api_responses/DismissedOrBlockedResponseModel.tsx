export type DismissedOrBlockedResponseModel = {
  message: string;
  data: DismissedOrBlocked[];
};

export type DismissedOrBlocked = {
  id: string;
  title: string;
  subtitle: string;
  profileImage: string;
};
