import RelationType from "models/enums/RelationType";
import FilePath from "models/FilePath";
import EIntBoolean from "models/enums/EIntBoolean";

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

export enum Status {
  PENDING = "pending",
  ACCEPTED = "accepted",
  BLOCKED = "blocked",
  DISMISSED = "dismissed",
  REJECTED = "rejected"
}

type Relation = {
  status: Status;
  isRoommate: EIntBoolean;
  isFriend: EIntBoolean;
};

export class RelationModel {
  id!: number;
  matchingUserId: number = 0;
  matchScore?: number;
  user?: RelationUser;
  createdAt: string = "";
  updatedAt: string = "";
  relation?: Relation;

  constructor(relationModel: RelationModel) {
    Object.assign(this, relationModel);
    this.user = Object.assign(new RelationUser(), this.user);
  }

  getType(): RelationType {
    if (this.relation !== null) {
      if (this.relation?.isRoommate === EIntBoolean.TRUE) {
        return RelationType.ROOMMATE;
      } else if (
        this.relation?.isFriend === EIntBoolean.TRUE &&
        this.relation?.status === Status.ACCEPTED
      ) {
        return RelationType.FRIEND;
      } else if (this.relation?.status === Status.PENDING) {
        return RelationType.FRIEND_REQUESTED;
      } else if (this.relation?.status === Status.DISMISSED) {
        return RelationType.DISMISSED;
      } else if (this.relation?.status === Status.BLOCKED) {
        return RelationType.BLOCKED;
      } else {
        return RelationType.NOT_FRIEND;
      }
    } else {
      return RelationType.NOT_FRIEND;
    }
  }
}

export default RelationModel;
