import QuestionSection, {
  BaseQuestionSection
} from "models/QuestionSection";
import Question, { BaseQuestion } from "models/Question";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";

export type QuestionsResponseModel = {
  message: string;
  data: SectionResponse[];
};

export type SectionResponse = BaseQuestionSection & {
  questions: BaseQuestion[];
};

export const toSections = (response: SectionResponse[]) => {
  const sections: Section<QuestionSection, Question>[] = [];
  response.forEach((value) => {
    const { questions, ...sectionData } = value;
    const section: Section<QuestionSection, Question> = {
      header: {
        ...sectionData,
        key: () => `Header${value.id}`
      },
      data: []
    };

    questions.forEach((value1) => {
      section.data.push({
        ...value1,
        key: () => `Header${value.id}|Body${value1.id}`
      });
    });
    sections.push(section);
  });
  return sections;
};
