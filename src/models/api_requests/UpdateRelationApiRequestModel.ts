export type UpdateRelationApiRequestModel = {
  receiverId: string;
  status?:
    | "accepted"
    | "rejected"
    | "blocked"
    | "unblock"
    | "unfriend"
    | "remove-roommate"
    | "cancel";
};
