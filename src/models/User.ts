export class User {
  id!: number;
  firstName!: string;
  lastName!: string;
  email!: string;
  secondaryEmail!: string;
  roleID!: number;
  roleTitle!: string;
  enrollmentID!: string;
  status!: string;
  profilePicture!: ProfilePicture;
  genderID!: number;
  gender!: string;
  major!: string;
  hometown!: string;
  program!: null;
  youtubeVideoURL?: null;
  matchingPattern?: string;
  matchingPatternWeightage?: number;
  matchGroupID?: number;
  matchGroupName?: string;
  floorPlanRoomID?: number;
  building?: string;
  roomNumber!: string;
  welcomeVideoStatus!: string;
  questionnaireStatus!: string;
  totalQuestions!: number;
  totalQuestionsAnswered!: number;
  activatedAt!: Date;
  profileCompletedAt!: null;
  loggedInAt!: Date;
  isFlagged!: number;
  lastReportedAt!: null;
  createdAt!: Date;
  updatedAt!: Date;

  constructor(user: User) {
    Object.assign(this, user);
  }

  fullName = () => {
    return this.firstName + " " + this.lastName;
  };
}

export interface ProfilePicture {
  fileURL: string;
  originalName: string;
}
