import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";

type QuestionSection = {
  id: string;
  title: string;
  description: string;
} & BaseItem;

export default QuestionSection;
