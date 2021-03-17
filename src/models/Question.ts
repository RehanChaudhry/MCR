import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";
import { Answer } from "models/Answer";

export type BaseQuestion = {
  id: number;
  sectionId: number;
  title: string;
  minOption: string;
  maxOption: string;
  createdAt: string;
  updatedAt: string;
  answer?: Answer;
};

type Question = BaseQuestion & BaseItem;

export default Question;
