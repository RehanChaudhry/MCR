import ProfileMatchType from "models/enums/ProfileMatchType";

export class ProfileMatch {
  userId!: number;
  profilePicture?: string;
  classLevel?: string;
  major?: string;
  matchScore?: number;
  status?: string;
  isFriend?: boolean = false;
  isRoommate?: boolean = false;
  createdAt!: string;

  getType(): ProfileMatchType {
    if (this.isRoommate) {
      return ProfileMatchType.ROOMMATE;
    } else if (this.isFriend) {
      return ProfileMatchType.FRIEND;
    } else if (this.createdAt /* condition as on server*/) {
      return ProfileMatchType.NEW;
    } else {
      return ProfileMatchType.NOT_FRIEND;
    }
  }
}

export default ProfileMatch;
