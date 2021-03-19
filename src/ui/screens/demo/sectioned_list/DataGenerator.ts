import { Section } from "ui/components/organisms/sectioned_list/SectionedList";
import QuestionSection from "models/QuestionSection";
import Question from "models/Question";

const getSections = () => {
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
      section.data.push({
        createdAt: "",
        sectionId: i,
        updatedAt: "",
        id: j,
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
