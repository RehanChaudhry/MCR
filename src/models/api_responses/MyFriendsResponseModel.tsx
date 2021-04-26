export type MyFriendsResponseModel = {
  message: string;
  data: MyFriend[];
};

export enum RELATION_REQUEST_STATUS {
  PENDING = "pending",
  ACCEPTED = "accepted",
  BLOCKED = "blocked",
  DISMISSED = "dismissed",
  REJECTED = "rejected"
}

export type MyFriend = {
  id: number;

  userId1: number;
  userId2: number;

  status: string;

  isFriend: boolean;

  friend: RelationUser;

  criteria: RelationEligibilityCriteria;
};

export type RelationUser = {
  id: number;
  firstName: string;
  lastName: string;

  matchGroupName: string;

  profilePicture: {
    fileURL: string;
  };
};

export type RelationEligibilityCriteria = {
  eligible: boolean;
  reason: string;
};
