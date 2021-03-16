import { BaseQuestion } from "models/Question";
import { SectionResponse } from "models/api_responses/QuestionsResponseModel";
import {
  NotificationData,
  NotificationsResponseModel
} from "models/api_responses/NotificationsResponseModel";

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
const getNotifications = () => {
  const notifications: NotificationData[] = [];
  for (let i = 0; i < 5; i++) {
    const notification: NotificationsResponseModel = {
      message: "Success",
      data: {
        id: `${i}`,
        type: `Lifestyle Preference ${i}`,
        date: Date.now().toString(),
        message:
          "Your answers to these questions will guide us to recommending the best roommate match for you. " +
          i
      }
    };
    notifications.push(notification.data);
  }

  return notifications;
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

export default { getQuestionSections, getQuestion, getNotifications };
