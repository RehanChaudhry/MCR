import { NotificationsResponseModel } from "models/api_responses/NotificationsResponseModel";
import moment from "moment";
import { AppLog } from "utils/Util";
import MatchInfo from "models/MatchInfo";
import { MyRoommatesResponseModel } from "models/api_responses/MyRoommatesResponseModel";
import { DismissedOrBlockedResponseModel } from "models/api_responses/DismissedOrBlockedResponseModel";
import { RoommateRequestsResponseModel } from "models/api_responses/RoommateRequestsResponseModel";

const getNotifications = () => {
  const date = new Date();

  //date: moment(date).subtract(i, "day").toDate().toString(),
  AppLog.log(
    () => "Data Generaor" + moment(date).subtract(2, "day").toDate()
  );

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

const getMatchInfo = () => {
  const matchInfo: MatchInfo = {
    isRoommateMatchingOpen: true,
    roommateMatchingDeadline: new Date(2021, 3, 10),
    maxRoommateCount: 4,
    matchingCriteria: {
      gender: "Male or female",
      majors: "Fine Arts Community"
    },
    roommates: []
  };
  return matchInfo;
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
  getNotifications,
  getMatchInfo,
  getMyRoommates,
  getDismissedOrBlocked,
  getRoommateRequests
};
