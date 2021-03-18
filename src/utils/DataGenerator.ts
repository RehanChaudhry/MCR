import { CommunityData } from "models/api_responses/CommunityResponseModel";
import { BaseQuestion } from "models/Question";
import { SectionResponse } from "models/api_responses/QuestionsResponseModel";

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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommunityList = (pageToLoad: number) => {
  const communities: CommunityData[] = [
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Phoenix Walker",
      time: "2 hours ago",
      text:
        "In the spirit of Ohio University's Mental Health Day break, I've decided to abstain from playing Super Smash Bros Ultimate today. Take care of yourself everyone! Sparkling heartSparkling heartSparkling heart ❤❤❤",
      likeCount: 20,
      commentCount: 5
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Zane Mayes",
      time: "3 hours ago",
      text:
        "First day at college, Ohio university. Thank you so much for watching",
      link: "https://www.youtube.com/watch?v=zWh3CShX_do",
      likeCount: 20,
      commentCount: 5
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Jasmine Lambert",
      time: "3 hours ago",
      text:
        "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree"
      ],
      likeCount: 20,
      commentCount: 5
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Jasmine Lambert",
      time: "3 hours ago",
      text:
        "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
      images: ["https://source.unsplash.com/1024x768/?nature"],
      likeCount: 20,
      commentCount: 5
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Jaweria Siddiqui",
      time: "3 hours ago",
      text:
        "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
      likeCount: 20,
      commentCount: 5,
      metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Zane Mayes",
      time: "3 hours ago",
      text:
        "First day at college, Ohio university. Thank you so much for watching",
      embeddedUrl:
        '<iframe width="100%" height="50%" src="https://www.youtube.com/embed/cqyziA30whE" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>',
      likeCount: 20,
      commentCount: 5
    }
  ];
  return communities;
};

export default { getQuestionSections, getQuestion, getCommunityList };
