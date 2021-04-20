export interface Photo {
  fileURL: string;
  originalName: string;
}

type CreatePostApiRequestModel = {
  content: string;
  link?: string;
  photos?: Photo[];
  embed?: string;
  type: string;
  everyone?: boolean;
  specificFloorPlan?: boolean;
  specificFloorPlanIds?: number[];
  specificMatchGroup?: boolean;
  specificMatchGroupIds?: number[];
  specificGender?: boolean;
  specificGenderIds?: number[];
};

export default CreatePostApiRequestModel;
