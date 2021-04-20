export type FetchMyProfileResponseModel = {
  message: string;
  data: Profile;
};

export type Profile = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture: {
    fileURL: string;
    originalName: string;
  };
  secondaryEmail: string;
  roleId: string;
  roleTitle: string;
  enrollmentId: string;
  status: string;
  genderId: number;
  gender: string;
  major?: string;
  program?: string;
  youtubeVideoURL?: string;
  matchGroupId: number;
  matchGroupName: string;
  floorPlanRoomId: number;
  building: string;
  roomNumber: string;
  welcomeVideoStatus: string;
  totalQuestions: number;
  totalQuestionsAnswered: number;
  isFlagged: number;
  createdAt: string;
  updatedAt: string;
};
