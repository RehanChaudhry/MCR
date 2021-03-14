import { BaseItem } from "ui/components/organisms/sectioned_list/SectionedList";

type Question = {
  id: string;
  title: string;
  minOption: string;
  maxOption: string;
} & BaseItem;

export default Question;
