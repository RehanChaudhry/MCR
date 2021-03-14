import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";

type QuestionGroup = {
  id: string;
  title: string;
  description: string;
} & BaseItem;

export default QuestionGroup;
