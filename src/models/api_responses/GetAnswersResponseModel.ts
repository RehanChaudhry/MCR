import { Answer } from "models/Answer";

export type GetAnswersResponseModel = {
  message: string;
  data: Answer[];
};
