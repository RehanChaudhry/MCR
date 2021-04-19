import RelationModel from "models/RelationModel";

type RelationApiResponseModel = {
  message: string;
  data: RelationModel[];
  count?: number;
};

export default RelationApiResponseModel;
