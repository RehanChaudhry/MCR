export type UpdateRelationStatus =
  | "accepted"
  | "rejected"
  | "blocked"
  | "unblock"
  | "unfriend"
  | "remove-roommate"
  | "cancel"
  | "dismissed"
  | "restored";

export type UpdateRelationApiRequestModel = {
  receiverId: number;
  status?: UpdateRelationStatus;
};
