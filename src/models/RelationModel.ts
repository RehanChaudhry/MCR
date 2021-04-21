import ProfileMatchType from "models/enums/ProfileMatchType";
import FilePath from "models/FilePath";

class RelationUser {
  firstName?: string;
  lastName?: string;
  profilePicture?: FilePath;
  matchGroupName?: string;
  major?: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName ?? ""}`;
  }
}

export class RelationModel {
  id!: number;
  matchingUserId: number = 0;
  matchScore?: number;
  user?: RelationUser;
  createdAt: string = "";
  updatedAt: string = "";
  relation?: any;

  constructor(relationModel: RelationModel) {
    Object.assign(this, relationModel);
    this.user = Object.assign(new RelationUser(), this.user);
  }

  getType(): ProfileMatchType {
    return ProfileMatchType.NOT_FRIEND;
  }
}

export default RelationModel;
