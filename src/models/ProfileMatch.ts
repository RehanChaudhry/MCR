import ProfileMatchType from "models/enums/ProfileMatchType";

export class ProfileMatch {
  userId: number = 0;
  userName?: string;
  profilePicture?: string;
  classLevel?: string;
  major?: string;
  matchScore?: number;
  status?: string;
  isFriend?: boolean = false;
  isRoommate?: boolean = false;
  isFriendRequested?: boolean = false;
  createdAt: string = "";

  constructor(
    userId: number,
    userName: string,
    profilePicture: string,
    classLevel: string,
    major: string,
    matchScore: number,
    status: string,
    isFriend: boolean,
    isRoommate: boolean,
    isFriendRequested: boolean,
    createdAt: string
  ) {
    this.userId = userId;
    this.userName = userName;
    this.profilePicture = profilePicture;
    this.classLevel = classLevel;
    this.major = major;
    this.matchScore = matchScore;
    this.status = status;
    this.isFriend = isFriend;
    this.isRoommate = isRoommate;
    this.isFriendRequested = isFriendRequested;
    this.createdAt = createdAt;
  }

  getType(): ProfileMatchType {
    if (this.isRoommate) {
      return ProfileMatchType.ROOMMATE;
    } else if (this.isFriend) {
      return ProfileMatchType.FRIEND;
    } else if (this.createdAt === "new" /* condition as on server*/) {
      return ProfileMatchType.NEW;
    } else {
      return ProfileMatchType.NOT_FRIEND;
    }
  }
}

export default ProfileMatch;
