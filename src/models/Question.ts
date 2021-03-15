import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";
import { Answer } from "models/Answer";

type Question = {
  id: number;
  sectionId: number;
  title: string;
  minOption: string;
  maxOption: string;
  createdAt: string;
  updatedAt: string;
  answer: Answer;
} & BaseItem;

export default Question;
