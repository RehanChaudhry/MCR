import { BaseQuestion } from "models/Question";
import { SectionResponse } from "models/api_responses/QuestionsResponseModel";
import ChatItem, { SenderType } from "models/ChatItem";

const getQuestionSections = () => {
  const sections: SectionResponse[] = [];
  for (let i = 0; i < 5; i++) {
    const section: SectionResponse = {
      section: {
        id: `${i}`,
        title: `Lifestyle Preference ${i}`,
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you. " +
          i
      },
      questions: []
    };

    for (let j = 0; j < 5; j++) {
      section.questions.push(getQuestion(j, i));
    }
    sections.push(section);
  }

  return sections;
};

const getQuestion = (
  questionId: number,
  sectionId: number
): BaseQuestion => {
  return {
    id: questionId,
    sectionId: sectionId,
    title: `When do you normally go to bed? ${questionId}`,
    minOption: "Lights out at 10!",
    maxOption: "Usually late, after 1 AM",
    createdAt: "2021-03-15T07:18:24.000Z",
    updatedAt: "2021-03-15T07:18:24.000Z"
  };
};

const getChats = (): ChatItem[] => {
  const chats: ChatItem[] = [];

  chats.push(
    createChat(
      0,
      ["Phoenix Walker", "Angela", "Grey"],
      false,
      SenderType.STUDENTS
    )
  );
  for (let i = 1; i < 15; i++) {
    if (i === 1) {
      chats.push(
        createChat(i, ["Nikki Engelin"], false, SenderType.STAFF)
      );
    } else if (i === 2) {
      chats.push(createChat(i, ["Jacoby Roman"], true, SenderType.STAFF));
    } else {
      if (i === 3) {
        chats.push(
          createChat(
            i,
            ["Luukas Haapala", "Abriella Bond"],
            true,
            SenderType.STUDENTS
          )
        );
      } else {
        chats.push(
          createChat(i, ["John Hopkins"], true, SenderType.STUDENTS)
        );
      }
    }
  }

  return chats;
};

function createChat(
  id: number,
  args: string[],
  isMessageRead: boolean = true,
  type: SenderType
): ChatItem {
  return {
    id: id,
    name: args,
    image: require("assets/images/d_user_pic.png"),
    message: "OK, I'll let him know.. sorry just saw your message",
    type: type,
    isMessageRead: isMessageRead,
    createdAt: "2021-03-15T07:18:24.000Z",
    updatedAt: "2021-03-15T07:18:24.000Z"
  };
}

export default { getQuestionSections, getQuestion, getChats };
