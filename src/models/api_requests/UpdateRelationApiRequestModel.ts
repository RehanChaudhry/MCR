export type UpdateRelationStatus =
  | "accepted"
  | "rejected"
  | "blocked"
  | "unblock"
  | "unfriend"
  | "remove-roommate"
  | "cancel";

export type UpdateRelationApiRequestModel = {
  receiverId: string;
  status?: UpdateRelationStatus;
};
