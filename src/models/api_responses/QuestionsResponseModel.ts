import QuestionSection, {
  BaseQuestionSection
} from "models/QuestionSection";
import Question, { BaseQuestion } from "models/Question";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import { Answer } from "models/Answer";

export type QuestionsResponseModel = {
  message: string;
  data: SectionResponse[];
};

export type SectionResponse = {
  section: BaseQuestionSection;
  questions: BaseQuestion[];
};

export const toSections = (response: SectionResponse[]) => {
  const sections: Section<QuestionSection, Question>[] = [];
  response.forEach((value) => {
    const section: Section<QuestionSection, Question> = {
      header: {
        ...value.section,
        key: () => `Header${value.section.id}`
      },
      data: []
    };

    value.questions.forEach((value1) => {
      section.data.push({
        ...value1,
        key: () => `Header${value.section.id}|Body${value1.id}`
      });
    });
    sections.push(section);
  });
  return sections;
};

export const toAnswersRequest = (
  sections: Section<QuestionSection, Question>[] | undefined
) => {
  const answers: Answer[] = [];
  sections?.forEach((value) => {
    value.data.forEach((value1) => {
      answers.push(value1.answer!);
    });
  });
  return answers;
};
