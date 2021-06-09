import { SectionsType } from "models/api_responses/DynamicFormSections";

export enum EWelcomeFlowStatus {
  PENDING = "pending",
  SKIPPED = "skipped",
  COMPLETED = "completed"
}

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
  welcomeVideoStatus: EWelcomeFlowStatus;
  questionnaireStatus: EWelcomeFlowStatus;
  profileCompletedAt?: Date;
  totalQuestions: number;
  totalQuestionsAnswered: number;
  totalProfileQuestions: number;
  totalProfileQuestionsAnswered: number;
  isFlagged: number;
  createdAt: string;
  updatedAt: string;
  sections: SectionsType[];
  agreementId: number;
  about?: string;
};

export const profileCompletedPercentage = (profile?: Profile) => {
  return profile
    ? ((profile.totalQuestionsAnswered +
        profile.totalProfileQuestionsAnswered) /
        (profile.totalQuestions + profile.totalProfileQuestions)) *
        100
    : 0;
};
