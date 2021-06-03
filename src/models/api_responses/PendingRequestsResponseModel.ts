import RelationModel from "models/RelationModel";

export type PendingRequestsResponseModel = {
  message: string;
  data?: RelationModel[];
};
