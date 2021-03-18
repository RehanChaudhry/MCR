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

  chats.push(createChat(0, ["Phoenix Walker", "Angela", "Grey"], false));
  for (let i = 1; i < 15; i++) {
    if (i === 1) {
      chats.push(createChat(i, ["John Hopkins"], false));
    } else {
      chats.push(createChat(i, ["John Hopkins"], true));
    }
  }

  return chats;
};

function createChat(
  id: number,
  args: string[],
  isMessageRead: boolean = true
): ChatItem {
  return {
    id: id,
    name: args,
    image: require("assets/images/d_user_pic.png"),
    message: "OK, I'll let him know.. sorry just saw your message",
    type: SenderType.STAFF,
    isMessageRead: isMessageRead,
    createdAt: "2021-03-15T07:18:24.000Z",
    updatedAt: "2021-03-15T07:18:24.000Z"
  };
}

export default { getQuestionSections, getQuestion, getChats };
