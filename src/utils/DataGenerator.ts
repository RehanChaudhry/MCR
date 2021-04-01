import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import {
  NotificationData,
  NotificationsResponseModel
} from "models/api_responses/NotificationsResponseModel";
import { SectionResponse } from "models/api_responses/QuestionsResponseModel";
import { UniSelectionResponseModel } from "models/api_responses/UniSelectionResponseModel";
import ChatItem, { SenderType } from "models/ChatItem";
import { BaseQuestion } from "models/Question";
import moment from "moment";
import { AppLog } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";
import {
  defaultPaletteCopy,
  grayShades
} from "hooks/theme/ColorPaletteContainer";
import MatchesApiRequestModel from "models/api_requests/MatchesApiRequestModel";
import MatchesApiResponseModel from "models/api_responses/MatchesApiResponseModel";
import {
  MyFriendsResponseModel,
  ROOMMATE_REQUEST_STATE
} from "models/api_responses/MyFriendsResponseModel";
import MatchInfo from "models/MatchInfo";
import { MyRoommatesResponseModel } from "models/api_responses/MyRoommatesResponseModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { FriendRequestsResponseModel } from "models/api_responses/FriendRequestsResponseModel";
import { RoommateRequestsResponseModel } from "models/api_responses/RoommateRequestsResponseModel";
import ActivityLogApiRequestModel from "models/api_requests/ActivityLogApiRequestModel";
import ActivityLogsResponseModel from "models/api_responses/ActivityLogsResponseModel";
import ActivityType from "models/enums/ActivityType";
import ActivityLog from "models/ActivityLog";

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
  const date = new Date();

  AppLog.log("Data Generaor" + moment(date).subtract(1, "day").toDate());

  for (let i = 0; i < 15; i++) {
    const notification: NotificationsResponseModel = {
      message: "Success",
      data: {
        id: `${i}`,
        type: `Lifestyle Preference ${i}`,
        date: moment(date).subtract(i, "day").toDate().toString(),
        message: "has sent you a friend request "
      }
    };
    notifications.push(notification.data);
  }

  return notifications;
};

const getUnis = () => {
  const response: UniSelectionResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        name: "Ohio University",
        location: "Athens, Ohio",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: false
      },
      {
        id: "2",
        name: "Boise State University",
        location: "Boise, Idaho",
        logo: "",
        colorPalette: {
          ...defaultPaletteCopy,
          primary: "#0033a0",
          primaryShade: "#DBEAFE",
          secondary: "#AB3607",
          secondaryShade: "#EBA184",
          interface: grayShades.gray
        },
        sso_login: true
      },
      {
        id: "3",
        name: "Florida International University",
        location: "Miami, Florida",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: false
      },
      {
        id: "4",
        name: "Oregon State University",
        location: "Corvillas, Oregon",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: true
      },
      {
        id: "5",
        name: "Duquesne University",
        location: "Pittsburgh, Pennsylvania",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: false
      },
      {
        id: "6",
        name: "Lehigh University",
        location: "Greenville, North Carolina",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: true
      },
      {
        id: "7",
        name: "North Dakota State University",
        location: "Fargo, North Dakota",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: false
      },
      {
        id: "8",
        name: "George Mason University",
        location: "Fairfax, Virginia",
        logo: "",
        colorPalette: defaultPaletteCopy,
        sso_login: true
      }
    ]
  };
  return response;
};

const getMyFriends = () => {
  const response: MyFriendsResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Phoenix Walker",
        subtitle: "Freshman, History",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        requestState: ROOMMATE_REQUEST_STATE.NONE
      },
      {
        id: "2",
        title: "Fox Mccloud",
        subtitle: "Honors, Fine Arts",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        requestState: ROOMMATE_REQUEST_STATE.REQUEST_SENT
      },
      {
        id: "3",
        title: "Health Atwood",
        subtitle: "Returner, Life Science",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
        requestState: ROOMMATE_REQUEST_STATE.NOT_ELIGIBLE
      }
    ]
  };
  return response;
};

const getMyRoommates = () => {
  const response: MyRoommatesResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Maria Randall",
        subtitle: "Freshman, History",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        id: "2",
        title: "Kari Rasmussen",
        subtitle: "Honors, Fine Arts",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  };
  return response;
};

const getDismissedOrBlocked = () => {
  const response: DismissedOrBlockedResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Maria Randall",
        subtitle: "Freshman, History",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        id: "2",
        title: "Kari Rasmussen",
        subtitle: "Honors, Fine Arts",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  };
  return response;
};

const getRoommateRequests = () => {
  const response: RoommateRequestsResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Maria Randall",
        subtitle: "Freshman, History",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        id: "2",
        title: "Kari Rasmussen",
        subtitle: "Honors, Fine Arts",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  };
  return response;
};

const getFriendRequests = () => {
  const response: FriendRequestsResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Mario Palmer",
        subtitle: "Freshman, History",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        id: "2",
        title: "Lana Steiner",
        subtitle: "Honors, Fine Arts",
        profileImage:
          "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  };
  return response;
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

const getProfileMatch = (id: number) => {
  return new ProfileMatch(
    id,
    "Phoenix Walker " + id,
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "Freshman",
    "History",
    95,
    "active",
    false,
    false,
    Math.random() < 0.5,
    "2021-03-15T07:18:24.000Z"
  );
};

const getProfileMatches: (
  request: MatchesApiRequestModel
) => Promise<{
  hasError: boolean;
  errorBody: undefined;
  dataBody: MatchesApiResponseModel;
}> = async (request: MatchesApiRequestModel) => {
  AppLog.log("getProfileMatches(), request: " + JSON.stringify(request));
  const profileMatches: ProfileMatch[] = [];
  for (let i = 0; i < (request.limit ?? 5); i++) {
    profileMatches.push(
      getProfileMatch(Math.floor(Math.random() * 100) + 1)
    );
  }
  const response = {
    hasError: false,
    errorBody: undefined,
    dataBody: {
      message: "Success",
      data: profileMatches,
      pagination: {
        total: 15,
        current: request.pageNo,
        first: profileMatches[0].userId,
        last: profileMatches[profileMatches.length - 1].userId,
        next: request.pageNo + 1 <= 3 ? request.pageNo + 1 : 0
      }
    }
  };
  AppLog.log(
    "getProfileMatches(), response: " + JSON.stringify(response.dataBody)
  );
  return response;
};

const getActivityLog = (id: number) => {
  return new ActivityLog(
    id,
    ActivityType.FRIEND_REQUEST_SENT,
    "Sent a friend request to <b>Taelyn Dickens</b>",
    randomDate(new Date(2021, 2, 30), new Date())
  );
};

const getActivityLogs: (
  request: ActivityLogApiRequestModel
) => Promise<{
  hasError: boolean;
  errorBody: undefined;
  dataBody: ActivityLogsResponseModel;
}> = async (request: ActivityLogApiRequestModel) => {
  AppLog.log("getActivityLogs(), request: " + JSON.stringify(request));
  const activityLogs: ActivityLog[] = [];
  for (let i = 0; i < (request.limit ?? 10); i++) {
    activityLogs.push(getActivityLog(Math.floor(Math.random() * 100) + 1));
  }
  const response = {
    hasError: false,
    errorBody: undefined,
    dataBody: {
      message: "Success",
      data: activityLogs,
      pagination: {
        total: 30,
        current: request.pageNo,
        first: activityLogs[0].id,
        last: activityLogs[activityLogs.length - 1].id,
        next: request.pageNo + 1 <= 3 ? request.pageNo + 1 : 0
      }
    }
  };
  AppLog.log(
    "getActivityLogs(), response: " + JSON.stringify(response.dataBody)
  );
  return response;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommunityAnnouncementList = (pageToLoad: number) => {
  const communitiesAnnouncements: CommunityAnnouncement[] = [
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
      link: "https://www.youtube.com/watch?v=cqyziA30whE",
      likeCount: 20,
      commentCount: 5
    },
    {
      id: Math.floor(Math.random() * 100) + 1,
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Sarah Steiner",
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
      name: "Alden Chaney",
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
        '<iframe width="100%" height="350" src="https://www.youtube.com/embed/cqyziA30whE?feature=oembed" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      likeCount: 20,
      commentCount: 5
    }
  ];
  return communitiesAnnouncements;
};

const getChats = (): ChatItem[] => {
  const chats: ChatItem[] = [];

  chats.push(
    createChat(
      0,
      ["Phoenix Walker", "Angela", "Grey"],
      false,
      SenderType.STUDENTS,
      0,
      usersImages[0],
      "OK, I'll let him know.. sorry just saw your message"
    )
  );

  chats.push(
    createChat(
      1,
      ["Nikki Engelin"],
      false,
      SenderType.STUDENTS,
      1,
      usersImages[1],
      "how are you?"
    )
  );

  chats.push(
    createChat(
      1,
      ["Jacoby Roman"],
      true,
      SenderType.STAFF,
      1,
      "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s900-c-k-c0x00ffffff-no-rj",
      "I haven’t received any respond on the last few messages.."
    )
  );

  chats.push(
    createChat(
      1,
      ["Reina Brooks"],
      true,
      SenderType.STUDENTS,
      1,
      usersImages[3],
      "Thank you for accepting my invitation."
    )
  );

  chats.push(
    createChat(
      1,
      ["Luukas Haapala", "Abriella Bond"],
      true,
      SenderType.STUDENTS,
      1,
      usersImages[4],
      "I heard about you and thought it would be worth reaching.. "
    )
  );

  chats.push(
    createChat(
      1,
      ["Macy Maher"],
      true,
      SenderType.STUDENTS,
      1,
      usersImages[5],
      "Life gets busy. Just wanted to make sure you got my last.."
    )
  );

  /*  for (let i = 1; i < 15; i++) {
    if (i === 1) {
      chats.push(
        createChat(i, ["Nikki Engelin"], false, SenderType.STAFF, i)
      );
    } else if (i === 2) {
      chats.push(
        createChat(i, ["Jacoby Roman"], true, SenderType.STAFF, i)
      );
    } else {
      if (i === 3) {
        chats.push(
          createChat(
            i,
            ["Luukas Haapala", "Abriella Bond"],
            true,
            SenderType.STUDENTS,
            i
          )
        );
      } else {
        chats.push(
          createChat(i, ["John Hopkins"], true, SenderType.STUDENTS, i)
        );
      }
    }
  }*/

  return chats;
};

const createChatThread = (): ChatItem[] => {
  const chats: ChatItem[] = [];

  const userOneId = 1;
  const userTwoId = 2;

  const messages = [
    "Uh oh! What's the problem?",
    "I was really happy when I invited you to stay with me in this apartment. I knew you had a problem with that girl you lived with before.",
    "Oh yeah, she was terrible. I couldn't move without her complaining at me."
  ];

  let messageIndex = 0;

  for (let i = 1; i < 8; i++) {
    if (messageIndex % 3 === 0) {
      messageIndex = 0;
    }

    chats.push(
      createChat(
        i,
        i % 2 === 0 ? ["Nikki Engelin"] : ["Phoenix Walker"],
        false,
        SenderType.STUDENTS,
        i % 2 === 0 ? userOneId : userTwoId,
        i % 2 === 0
          ? require("assets/images/d_user_pic.png")
          : require("assets/images/d_user_pick_1.png"),
        messages[messageIndex]
      )
    );

    messageIndex++;
  }
  return chats;
};

function createChat(
  id: number,
  args: string[],
  isMessageRead: boolean = true,
  type: SenderType,
  userId: number,
  image?: string | null,
  message?: string
): ChatItem {
  const date = randomDate(new Date(2021, 3, 1), new Date());
  // AppLog.log("generated date : " + date);
  return {
    id: id,
    name: args,
    image:
      image !== null ? image : require("assets/images/d_user_pic.png"),
    message: message
      ? message
      : "OK, I'll let him know.. sorry just saw your message",
    type: type,
    userId: userId,
    isMessageRead: isMessageRead,
    createdAt: date.toString(),
    updatedAt: date.toString()
  };
}

const randomDate = (start: Date, end: Date) =>
  new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

const getMatchInfo = () => {
  const matchInfo: MatchInfo = {
    id: 1,
    name: "Zane Mayes",
    profilePicture:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    classLevel: "Freshman",
    major: "Interior Architecture",
    shortIntro:
      "I am a Interior Architecture major who also likes to play the bass guitar. I always clean up after myself and I like having a quiet environment but I'm down to do fun stuff as well! I am kind of introverted but once we get to know each other, I’ll be your best friend.",
    profileCompletePercentage: 65,
    isRoommateMatchingOpen: true,
    roommateMatchingDeadline: new Date(2021, 3, 10),
    maxRoommateCount: 4,
    matchingCriteria: {
      gender: "Male or female",
      majors: "Fine Arts Community"
    },
    roommates: [getRoommate(0), getRoommate(1)]
  };
  return matchInfo;
};

const getRoommate = (id: number) =>
  new ProfileMatch(
    id,
    "Phoenix Walker",
    "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    "Freshman",
    "History",
    95,
    "active",
    true,
    true,
    true,
    "2021-03-15T07:18:24.000Z"
  );

const createComments = (): ChatItem[] => {
  const comments: ChatItem[] = [];

  const userOneId = 1;
  for (let i = 1; i < 15; i++) {
    comments.push(
      createChat(
        i,
        i % 2 === 0 ? ["Nikki Engelin"] : ["Phoenix Walker"],
        false,
        SenderType.STUDENTS,
        userOneId,
        require("assets/images/d_user_pic.png")
      )
    );
  }
  return comments;
};

const usersImages = [
  "https://news.umanitoba.ca/wp-content/uploads/2019/03/IMG_9991-1200x800.jpg",
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcST8F8--z5CdhblS5e6hH7DgsFPTlxs9p2w0w&usqp=CAU",
  "https://vrs.amsi.org.au/wp-content/uploads/sites/78/2017/12/tobinsouth_vrs_2017-18.jpeg",
  "https://oregonctso.org/Websites/oregoncte/images/BlogFeaturedImages/decaheadshot.jpg",
  "https://the-bac.edu/images/content/News/2017/Fall/20171102-JacobFerreira-400x300.jpg",
  "https://harris.uchicago.edu/files/styles/square/public/2019-10/emileigh_harrison_cropped.jpg?itok=zL13vTOG",
  "https://history.ubc.ca/wp-content/uploads/sites/23/2020/01/Kevin-website.jpg",
  "https://www.bc.edu/content/dam/files/schools/cas_sites/cs/profiles/Student_Profile.jpg",
  ""
];

export default {
  getQuestionSections,
  getQuestion,
  getChats,
  getNotifications,
  getCommunityAnnouncementList,
  createChatThread,
  createChat,
  getProfileMatch,
  getProfileMatches,
  getUnis,
  getMyFriends,
  getMatchInfo,
  getMyRoommates,
  getDismissedOrBlocked,
  getFriendRequests,
  getRoommateRequests,
  createComments,
  getActivityLogs
};
