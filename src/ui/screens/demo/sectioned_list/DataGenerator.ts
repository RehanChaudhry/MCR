import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionGroup from "models/QuestionGroup";
import Question from "models/Question";

const getSections = () => {
  const sections: Section<QuestionGroup, Question>[] = [];
  for (let i = 0; i < 5; i++) {
    const section: Section<QuestionGroup, Question> = {
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
      section.data.push({
        id: `${i}`,
        title: `When do you normally go to bed? ${j}`,
        minOption: "Lights out at 10!",
        maxOption: "Usually late, after 1 AM",
        key: () => `Header${i}|Body${j}`
      });
    }
    sections.push(section);
  }

  return sections;
};

export default { getSections };
