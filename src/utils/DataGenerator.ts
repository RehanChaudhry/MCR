import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";
import { SectionResponse } from "models/api_responses/QuestionsResponseModel";
import { UniSelectionResponseModel } from "models/api_responses/UniSelectionResponseModel";
import ChatItem, { SenderType } from "models/ChatItem";
import { BaseQuestion } from "models/Question";
import moment from "moment";
import { AppLog } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";
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
import uuid from "uuid";
import AgreementStatus from "models/enums/AgreementStatusType";
import { AgreementDetailsResponseModel } from "models/api_responses/AgreementDetailsResponseModel";

const getQuestionSections = () => {
  const sections: SectionResponse[] = [
    {
      section: {
        id: "1",
        title: "Lifestyle Preference",
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you."
      },
      questions: getQuestions(1)
    },
    {
      section: {
        id: "2",
        title: "Social Preference",
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you."
      },
      questions: getQuestions(2)
    },
    {
      section: {
        id: "3",
        title: "Room Preference",
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you."
      },
      questions: getQuestions(3)
    },
    {
      section: {
        id: "4",
        title: "Personality Preference",
        description:
          "Your answers to these questions will guide us to recommending the best roommate match for you."
      },
      questions: getQuestions(4)
    }
  ];

  return sections;
};

const getNotifications = () => {
  const date = new Date();

  //date: moment(date).subtract(i, "day").toDate().toString(),
  AppLog.log("Data Generaor" + moment(date).subtract(2, "day").toDate());

  const response: NotificationsResponseModel = {
    message: "Success",
    data: [
      {
        id: "1",
        name: "Phoenix Walker",
        profileUrl:
          "https://news.umanitoba.ca/wp-content/uploads/2019/03/IMG_9991-1200x800.jpg",
        type: `View Request`,
        date: moment(date).toDate().toString(),
        message: "has sent you a friend request ",
        boldText: ""
      },
      {
        id: "2",
        name: "Anne Mcfadden",
        profileUrl:
          "https://www.londonmet.ac.uk/media/london-metropolitan-university/london-met-photos/students-studying-at-london-met/student-profiles/Sophia-Allwood-900-x-524.jpg",
        type: `View Message`,
        date: moment(date).subtract(1, "day").toDate().toString(),
        message:
          "has started a new conversation with you, Aris Johonson & 2 more ",
        boldText: ""
      },
      {
        id: "3",
        name: "Jakobe Snell",
        profileUrl:
          "https://www.law.uchicago.edu/files/styles/extra_large/public/2018-03/theisen_tarra.jpg?itok=5iSSWAci",
        type: `View Request`,
        date: moment(date).subtract(1, "day").toDate().toString(),
        message: "has sent you a roommate request ",
        boldText: ""
      },
      {
        id: "4",
        name: "Katherine Moss",
        profileUrl:
          "https://oregonctso.org/Websites/oregoncte/images/BlogFeaturedImages/decaheadshot.jpg",
        type: `View Details`,
        date: moment(date).subtract(2, "day").toDate().toString(),
        message: "has edited and agreed on roomate agreement ",
        boldText: ""
      },
      {
        id: "5",
        name: "Britney Cooper",
        profileUrl:
          "https://the-bac.edu/images/content/News/2017/Fall/20171102-JacobFerreira-400x300.jpg",
        type: `View Details`,
        date: moment(date).subtract(2, "day").toDate().toString(),
        message: "has edited and disagreed on roomate agreement ",
        boldText: ""
      },
      {
        id: "6",
        name: "Ohio University's Staff",
        profileUrl:
          "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
        type: `View Post`,
        date: moment(date).subtract(6, "day").toDate().toString(),
        message: "has sent you a friend request ",
        boldText: ""
      },
      {
        id: "7",
        name: "Fox Mccloud",
        profileUrl:
          "https://history.ubc.ca/wp-content/uploads/sites/23/2020/01/Kevin-website.jpg",
        type: `View Comment`,
        date: moment(date).subtract(7, "day").toDate().toString(),
        message: "has posted a comment on your post,",
        boldText: " “Forever can seem daunting..” "
      },
      {
        id: "8",
        name: "Abriella Bond",
        profileUrl:
          "https://www.bc.edu/content/dam/files/schools/cas_sites/cs/profiles/Student_Profile.jpg",
        type: `View Post`,
        date: moment(date).subtract(8, "day").toDate().toString(),
        message: "has liked your post,",
        boldText: " “Forever can seem daunting from the outside..” "
      },
      {
        id: "9",
        name: "Kianna Pham",
        profileUrl:
          "https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg",
        type: `View Request  `,
        date: moment(date).subtract(9, "day").toDate().toString(),
        message: "has sent you a friend request",
        boldText: ""
      },
      {
        id: "10",
        name: "Ellis Schaefer ",
        profileUrl:
          "https://harris.uchicago.edu/files/styles/square/public/2019-10/emileigh_harrison_cropped.jpg?itok=zL13vTOG",
        type: `View Message`,
        date: moment(date).subtract(9, "day").toDate().toString(),
        message: "has sent you a new chat message,",
        boldText: " “Thanks for your help, lets meet..”"
      }
    ]
  };

  return response;
};

const getUnis = () => {
  const response: UniSelectionResponseModel = {
    message: "",
    data: [
      {
        id: "1",
        title: "Ohio University",
        timezone: "Athens, Ohio",
        mainLogo: {
          fileURL: "",
          originalName: ""
        },
        ssoMethod: "shiboleth"
      },
      {
        id: "2",
        title: "Boise State University",
        timezone: "Boise, Idaho",
        mainLogo: {
          fileURL: "",
          originalName: ""
        },
        ssoMethod: "off"
      },
      {
        id: "3",
        title: "Florida International University",
        timezone: "Miami, Florida",
        mainLogo: {
          fileURL: "",
          originalName: ""
        },
        ssoMethod: "CAS"
      },
      {
        id: "4",
        title: "Oregon State University",
        timezone: "Corvillas, Oregon",
        mainLogo: {
          fileURL: "",
          originalName: ""
        },
        ssoMethod: "off"
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
        profileImage: usersImages[1],
        requestState: ROOMMATE_REQUEST_STATE.REQUEST_SENT
      },
      {
        id: "3",
        title: "Health Atwood",
        subtitle: "Returner, Life Science",
        profileImage: usersImages[2],
        requestState: ROOMMATE_REQUEST_STATE.NOT_ELIGIBLE
      }
    ]
  };
  return response;
};

const getAgreementDetails = () => {
  const response: AgreementDetailsResponseModel = {
    message: "",
    data: [
      {
        id: 1,
        username: "Kinslee Fink",
        profileUrl:
          "https://www.law.uchicago.edu/files/styles/extra_large/public/2018-03/theisen_tarra.jpg?itok=5iSSWAci",
        updated_At: "on Feb 10, 2021",
        status: AgreementStatus.AGREED
      },
      {
        id: 2,
        username: "Rosa Lawson",
        profileUrl:
          "https://harris.uchicago.edu/files/styles/square/public/2019-10/emileigh_harrison_cropped.jpg?itok=zL13vTOG",
        updated_At: "on Feb 11, 2021",
        status: AgreementStatus.DISAGREED
      },
      {
        id: 3,
        username: "Zane Mayes",
        profileUrl:
          "https://www.bc.edu/content/dam/files/schools/cas_sites/cs/profiles/Student_Profile.jpg",
        updated_At: "",
        status: AgreementStatus.PENDING
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
        profileImage: usersImages[1]
      },
      {
        id: "2",
        title: "Kari Rasmussen",
        subtitle: "Honors, Fine Arts",
        profileImage: usersImages[3]
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
        profileImage: usersImages[1]
      },
      {
        id: "2",
        title: "Kari Rasmussen",
        subtitle: "Honors, Fine Arts",
        profileImage: usersImages[3]
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
        profileImage: usersImages[1]
      },
      {
        id: "2",
        title: "Lana Steiner",
        subtitle: "Honors, Fine Arts",
        profileImage: usersImages[3]
      }
    ]
  };
  return response;
};

const getQuestions = (sectionId: number): BaseQuestion[] => {
  return [
    {
      id: 1,
      sectionId: sectionId,
      title: `When do you normally go to bed?`,
      minOption: "Lights out at 10!",
      maxOption: "Usually late, after 1 AM",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 2,
      sectionId: sectionId,
      title: `Where do you plan on studying?`,
      minOption: "Only in my room",
      maxOption: "I can study anywhere - library, outside, etc.",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 3,
      sectionId: sectionId,
      title: `Do you smoke?`,
      minOption: "Never",
      maxOption: "A pack a day or more",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 4,
      sectionId: sectionId,
      title: `How often do you bathe or shower?`,
      minOption: "Does wearing deodorant count as a shower?",
      maxOption: "Minimum daily, sometimes more often!",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 5,
      sectionId: sectionId,
      title: `How often do you use technology (social media, electronics)?`,
      minOption: "Occasionally",
      maxOption: "Every waking moment",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 6,
      sectionId: sectionId,
      title: `What is your expected Study/Party balance?`,
      minOption: "Occasionally",
      maxOption: "Every waking moment",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 7,
      sectionId: sectionId,
      title: `Describe your expected alcohol consumption.`,
      minOption: "I never drink alcohol",
      maxOption: "What time is the party?",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 8,
      sectionId: sectionId,
      title: `What is your view on Marijuana?`,
      minOption: "Should be off-limits",
      maxOption: "Legalize it please",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    },
    {
      id: 9,
      sectionId: sectionId,
      title: `How do you approach life?`,
      minOption: "Seriously",
      maxOption: "All seriousness aside",
      createdAt: "2021-03-15T07:18:24.000Z",
      updatedAt: "2021-03-15T07:18:24.000Z"
    }
  ];
};

const getProfileMatch = (tens: number) => {
  const profileMatches: ProfileMatch[] = [];
  profileMatches.push(
    new ProfileMatch(
      tens + 1,
      "Phoenix Walker",
      "https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg",
      "Freshman",
      "History",
      95,
      "active",
      false,
      false,
      Math.random() < 0.5,
      "2021-03-15T07:18:24.000Z"
    )
  );
  profileMatches.push(
    new ProfileMatch(
      tens + 2,
      "Jasmine Lambert",
      "https://www.law.uchicago.edu/files/styles/extra_large/public/2018-03/theisen_tarra.jpg?itok=5iSSWAci",
      "Freshman",
      "History",
      32,
      "active",
      false,
      false,
      Math.random() < 0.5,
      "2021-03-15T07:18:24.000Z"
    )
  );
  profileMatches.push(
    new ProfileMatch(
      tens + 3,
      "Sarah Steiner",
      "https://oregonctso.org/Websites/oregoncte/images/BlogFeaturedImages/decaheadshot.jpg",
      "Freshman",
      "History",
      67,
      "active",
      false,
      false,
      Math.random() < 0.5,
      "2021-03-15T07:18:24.000Z"
    )
  );
  profileMatches.push(
    new ProfileMatch(
      tens + 4,
      "Case Wolf",
      "https://www.bc.edu/content/dam/files/schools/cas_sites/cs/profiles/Student_Profile.jpg",
      "Freshman",
      "History",
      89,
      "active",
      false,
      false,
      Math.random() < 0.5,
      "2021-03-15T07:18:24.000Z"
    )
  );
  profileMatches.push(
    new ProfileMatch(
      tens + 5,
      "Alden Chaney",
      "https://news.umanitoba.ca/wp-content/uploads/2019/03/IMG_9991-1200x800.jpg",
      "Freshman",
      "History",
      23,
      "active",
      false,
      false,
      Math.random() < 0.5,
      "2021-03-15T07:18:24.000Z"
    )
  );
  return profileMatches;
};

const getProfileMatches: (
  request: MatchesApiRequestModel
) => Promise<{
  hasError: boolean;
  errorBody: undefined;
  dataBody: MatchesApiResponseModel;
}> = async (request: MatchesApiRequestModel) => {
  // AppLog.log("getProfileMatches(), request: " + JSON.stringify(request));
  const profileMatches: ProfileMatch[] = getProfileMatch(
    request.pageNo * 10
  );
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
  // AppLog.log(
  //   "getProfileMatches(), response: " + JSON.stringify(response.dataBody)
  // );
  return response;
};

const getActivityLog = () => {
  const activityLogs: ActivityLog[] = [];
  activityLogs.push(
    new ActivityLog(
      1,
      ActivityType.FRIEND_REQUEST_SENT,
      "Sent a friend request to <b>Taelyn Dickens</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      2,
      ActivityType.ADDED_TO_DISMISSED,
      "Added <b>Milagro Betts</b> to the dismissed list",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      3,
      ActivityType.CREATED_POST,
      'Created a new post in community, <b>"Summer with friends..."</b>',
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      4,
      ActivityType.CREATED_CONVERSATION,
      "Created a new conservation with <b>Emmalee Mclain & Leo Gill</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      5,
      ActivityType.ROOMMATE_REQUEST_SENT,
      "Sent a roommate request to <b>Kyler Ochoa</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      6,
      ActivityType.UPDATED_QUESTIONNAIRE,
      "Updated your <b>Questionnaire</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      7,
      ActivityType.UPDATED_PROFILE,
      "Updated your <b>Profile</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      8,
      ActivityType.UPDATED_AGREEMENT,
      "Updated and agreed on <b>Roommate Agreement</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      9,
      ActivityType.COMMENT,
      'Posted a comment on <b>"A surprising way that OHIO is monitoring COVID-19"</b>',
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      10,
      ActivityType.FRIEND_REQUEST_SENT,
      "Sent a friend request to <b>Reina Brooks</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );
  activityLogs.push(
    new ActivityLog(
      11,
      ActivityType.CREATED_CONVERSATION,
      "Created a new conservation with <b>Becky George & Inara Britt</b>",
      randomDate(new Date(2021, 2, 30), new Date())
    )
  );

  return activityLogs;
};

const getActivityLogs: (
  request: ActivityLogApiRequestModel
) => Promise<{
  hasError: boolean;
  errorBody: undefined;
  dataBody: ActivityLogsResponseModel;
}> = async (request: ActivityLogApiRequestModel) => {
  AppLog.log("getActivityLogs(), request: " + JSON.stringify(request));
  const activityLogs: ActivityLog[] = getActivityLog();
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
const getAnnouncementList = (pageToLoad: number) => {
  const announcements: CommunityAnnouncement[] = [
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
      name: "Ohio University",
      time: "2 hours ago",
      text:
        "A surprising way that OHIO is monitoring COVID-19 trends is by analyzing campus wastewater 😷\n" +
        "\n" +
        "“One of the real advantages of looking for COVID-19 this way is that people shed the virus before they express symptoms and if people are asymptomatic, they will also shed the virus without knowing they’re infected,” said Dr. Guy Riefler, who is leading the project along with Dr. Karen Coschigano. 🎵🎵🎵",
      likeCount: 32,
      commentCount: 8,
      metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
      name: "Ohio University",
      time: "3 hours ago",
      text:
        "Bobcats on the Athens campus… Stay tuned to our social media channels to see how you can get a #ForeverOHIO t-shirt next week 💚 👀",
      images: ["https://source.unsplash.com/1024x768/?nature"],
      likeCount: 30,
      commentCount: 2
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
      name: "Ohio University",
      time: "2 hours ago",
      text:
        "Ohio University takes all allegations of sexual misconduct seriously and investigates these matters thoroughly. The personal safety and welfare of our students and the campus community are our top priorities, and equitable measures are taken to ensure any and all complaints are handled appropriately.🎵🎵🎵",
      likeCount: 32,
      commentCount: 8,
      metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
      name: "Ohio University",
      time: "3 hours ago",
      text:
        "Vaccines are one way to stop COVID-19, but Dr. Jennifer Hines, a professor in the Department of Chemistry and Biochemistry, has discovered another- by disrupting the virus’s RNA and ability to reproduce.",
      images: ["https://source.unsplash.com/1024x768/?water"],
      likeCount: 30,
      commentCount: 2
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://yt3.ggpht.com/ytc/AAUvwnjmlVPI8r5Lma1NPOaQU4z4UamGlStIKerg5g_b4g=s88-c-k-c0x00ffffff-no-rj",
      name: "Ohio University",
      time: "2 hours ago",
      text:
        "Ohio University takes all allegations of sexual misconduct seriously and investigates these matters thoroughly. The personal safety and welfare of our students and the campus community are our top priorities, and equitable measures are taken to ensure any and all complaints are handled appropriately.🎵🎵🎵",
      likeCount: 32,
      commentCount: 8,
      metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
    }
  ];
  return announcements;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCommunityList = (pageToLoad: number) => {
  const communities: CommunityAnnouncement[] = [
    {
      id: uuid.v4(),
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
      id: uuid.v4(),
      profileImageUrl:
        "https://www.law.uchicago.edu/files/styles/extra_large/public/2018-03/theisen_tarra.jpg?itok=5iSSWAci",
      name: "Jasmine Lambert",
      time: "3 hours ago",
      text:
        "OHIO’s beloved Rufus has undergone many makeovers since 1804, and did you know that he used to be accompanied by the Bobkitten?! Check out this iconic transformation from 1977 to now 😸 ",
      images: ["https://source.unsplash.com/1024x768/?nature"],
      likeCount: 32,
      commentCount: 8
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://publichealth.uga.edu/wp-content/uploads/2020/01/Thomas-Cameron_Student_Profile.jpg",
      name: "Alden Chaney",
      time: "5 hours ago",
      text:
        "Welcome back, Bobcats! 😺 We’re sending our best wishes to everyone on the first day of spring semester 💚",
      images: [
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?water",
        "https://source.unsplash.com/1024x768/?nature",
        "https://source.unsplash.com/1024x768/?tree"
      ],
      likeCount: 22,
      commentCount: 8
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://oregonctso.org/Websites/oregoncte/images/BlogFeaturedImages/decaheadshot.jpg",
      name: "Sarah Steiner",
      time: "8 hours ago",
      text:
        "First day at college, Ohio university. Thank you so much for watching",
      link: "https://youtu.be/EeCKk94lmHQ",
      likeCount: 20,
      commentCount: 5
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://www.bc.edu/content/dam/files/schools/cas_sites/cs/profiles/Student_Profile.jpg",
      name: "Case Wolf",
      time: "8 hours ago",
      text: "Lofi 4 studying.. 🎵🎵🎵",
      likeCount: 20,
      commentCount: 5,
      metaDataUrl: "https://www.youtube.com/watch?v=Kmiw4FYTg2U"
    },
    {
      id: uuid.v4(),
      profileImageUrl:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
      name: "Zane Mayes",
      time: "3 hours ago",
      text:
        "First day at college, Ohio university. Thank you so much for watching",
      embeddedUrl:
        '<iframe width="100%" height="350" src="https://www.youtube.com/embed/EeCKk94lmHQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>',
      likeCount: 20,
      commentCount: 5
    }
  ];
  return communities;
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
      ["Nikky Engelen"],
      false,
      SenderType.STUDENTS,
      1,
      usersImages[1],
      "how are you?"
    )
  );

  chats.push(
    createChat(
      2,
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
      3,
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
      4,
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
      5,
      ["Macy Maher"],
      true,
      SenderType.STUDENTS,
      1,
      usersImages[5],
      "Life gets busy. Just wanted to make sure you got my last.."
    )
  );

  chats.push(
    createChat(
      6,
      ["Fox Mccloud"],
      true,
      SenderType.STUDENTS,
      1,
      usersImages[6],
      "Life gets busy. Just wanted to make sure you got my last.."
    )
  );

  for (let i = 1; i < 15; i++) {
    /* if (i === 1) {
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
      } else {*/
    /* chats.push(
      createChat(i, ["John Hopkins"], true, SenderType.STUDENTS, i)
    );*/
    /*  }
    }*/
  }

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
        i % 2 === 0 ? usersImages[0] : usersImages[2],
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
  comments.push(
    createChat(
      1,
      ["Nikki Engelin"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[0]
    )
  );
  comments.push(
    createChat(
      2,
      ["Phoenix Walker"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[2],
      "how are you?"
    )
  );
  comments.push(
    createChat(
      3,
      ["Jasmine Lambert"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[1],
      "I haven’t received any respond on the last few messages.."
    )
  );
  comments.push(
    createChat(
      4,
      ["Alden Chaney"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[3],
      "Thank you for accepting my invitation."
    )
  );
  comments.push(
    createChat(
      5,
      ["Sarah Steiner"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[1],
      "I heard about you and thought it would be worth reaching.. "
    )
  );
  comments.push(
    createChat(
      6,
      ["Case Wolf"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[5],
      "how are you?"
    )
  );
  comments.push(
    createChat(
      7,
      ["Jasmine Lambert"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[5],
      "I haven’t received any respond on the last few messages.."
    )
  );
  comments.push(
    createChat(
      8,
      ["Zane Mayes"],
      false,
      SenderType.STUDENTS,
      userOneId,
      usersImages[7],
      "Life gets busy. Just wanted to make sure you got my last.."
    )
  );
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
  getChats,
  getNotifications,
  getCommunityList,
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
  getAnnouncementList,
  getActivityLogs,
  getAgreementDetails
};
