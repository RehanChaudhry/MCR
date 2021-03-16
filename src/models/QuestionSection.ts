import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";

export type BaseQuestionSection = {
  id: string;
  title: string;
  description: string;
};

type QuestionSection = BaseQuestionSection & BaseItem;

export default QuestionSection;
