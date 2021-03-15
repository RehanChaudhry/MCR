import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";

const getQuestionSections = () => {
  const sections: Section<QuestionSection, Question>[] = [];
  for (let i = 0; i < 5; i++) {
    const section: Section<QuestionSection, Question> = {
      header: {
        id: `${i}`,
        title: `Lifestyle Preference ${i}`,
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you. " +
          i,
        key: () => `Header${i}`
      },
      data: []
    };

    for (let j = 0; j < 5; j++) {
      section.data.push(getQuestion(j, i));
    }
    sections.push(section);
  }

  return sections;
};

const getQuestion = (questionId: number, sectionId: number): Question => {
  return {
    id: questionId,
    sectionId: sectionId,
    title: `When do you normally go to bed? ${questionId}`,
    minOption: "Lights out at 10!",
    maxOption: "Usually late, after 1 AM",
    createdAt: "2021-03-15T07:18:24.000Z",
    updatedAt: "2021-03-15T07:18:24.000Z",
    key: () => `Header${sectionId}|Body${questionId}`
  };
};

export default { getQuestionSections, getQuestion };
