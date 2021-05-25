import { StaticContentType } from "models/api_requests/StaticContentRequestModel";

export type StaticContent = {
  id: number;
  type: StaticContentType;
  title?: string;
  description?: string;
  content?: string;
  youtubeVideoUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

type StaticContentResponseModel = {
  message: string;
  data?: StaticContent;
};

export default StaticContentResponseModel;
