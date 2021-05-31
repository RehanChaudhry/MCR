import { SectionsType } from "models/api_responses/DynamicFormSections";

export type UpdateProfileUiResponseModel = {
  message: string;
  data: ProfileData;
};

export type ProfileData = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  secondaryEmail: string;
  password: string;
  roleId: number;
  roleTitle: string;
  enrollmentId: string;
  status: string;
  profilePicture: {
    fileURL: string;
    originalName: string;
  };
  genderId: number;
  gender: string;
  major: string;
  hometown: string;
  program: string;
  youtubeVideoURL: string;
  matchingPattern: string;
  matchingPatternWeightage: number;
  matchGroupId: number;
  matchGroupName: string;
  floorPlanRoomId: number;
  building: string;
  roomNumber: string;
  welcomeVideoStatus: string;
  questionnaireStatus: string;
  totalQuestions: number;
  totalQuestionsAnswered: number;
  passwordToken: string;
  activatedAt: string;
  profileCompletedAt: string;
  loggedInAt: string;
  isFlagged: number;
  lastReportedAt: string;
  createdAt: string;
  updatedAt: string;
  sections: SectionsType[];
  agreementId: number;
};
