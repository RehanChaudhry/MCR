import QuestionSection from "models/QuestionSection";
import Question from "models/Question";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import { Answer } from "models/Answer";

export type QuestionsResponseModel = {
  message: string;
  data: SectionResponse[];
};

export type SectionResponse = {
  section: QuestionSection;
  questions: Question[];
};

export const toSections = (response: QuestionsResponseModel) => {
  const sections: Section<QuestionSection, Question>[] = [];
  response.data.forEach((value) => {
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
  sections: Section<QuestionSection, Question>[]
) => {
  const answers: Answer[] = [];
  sections.forEach((value) => {
    value.data.forEach((value1) => {
      answers.push(value1.answer);
    });
  });
  return answers;
};
