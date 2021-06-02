export type UpdateRelationStatus =
  | "accepted"
  | "rejected"
  | "blocked"
  | "unblock"
  | "unfriend"
  | "remove-roommate"
  | "cancel"
  | "dismissed";

export type UpdateRelationApiRequestModel = {
  receiverId: number;
  status?: UpdateRelationStatus;
};
