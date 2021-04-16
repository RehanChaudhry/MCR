import QuestionSection, {
  BaseQuestionSection
} from "models/QuestionSection";
import Question, { BaseQuestion } from "models/Question";
import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import { Answer } from "models/Answer";

export type SectionResponse = BaseQuestionSection & {
  questions: BaseQuestion[];
};

class QuestionsResponseModel {
  message: string = "Success";
  data?: SectionResponse[];

  constructor(message: string, data?: SectionResponse[]) {
    this.message = message;
    this.data = data;
  }

  assignAnswers(answers: Answer[]) {
    this.data?.forEach((value) => {
      const { questions } = value;
      questions.forEach((question) => {
        question.answer = answers.find(
          (answer) => answer.questionId === question.id
        );
      });
    });
  }

  toSections() {
    const sections: Section<QuestionSection, Question>[] = [];
    this.data?.forEach((value) => {
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
  }
}

export default QuestionsResponseModel;
