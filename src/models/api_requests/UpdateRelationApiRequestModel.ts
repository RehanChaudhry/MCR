export type UpdateRelationApiRequestModel = {
  recieverId: string;
  status?:
    | "accepted"
    | "rejected"
    | "blocked"
    | "unblock"
    | "unfriend"
    | "remove-roommate"
    | "cancel";
};
