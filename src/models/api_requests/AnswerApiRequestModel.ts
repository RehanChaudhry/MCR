import { Answer } from "models/Answer";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";

export type AnswerApiRequestModel = {
  answers: Answer[];
};

export const toAnswersRequest = (
  sections: Section<QuestionSection, Question>[] | undefined
) => {
  const answers: Answer[] = [];
  sections?.forEach((value) => {
    value.data.forEach((value1) => {
      answers.push(
        value1.answer ?? {
          questionId: value1.id,
          minPreference: 3,
          maxPreference: 7,
          noPreference: false,
          answer: 5
        }
      );
    });
  });
  return answers;
};
