import EIntBoolean from "models/enums/EIntBoolean";
import RelationType from "models/enums/RelationType";
import FilePath from "models/FilePath";

export class RelationUser {
  firstName?: string;
  lastName?: string;
  profilePicture?: FilePath;
  hometown?: string;
  major?: string;

  getFullName(): string {
    return `${this.firstName} ${this.lastName ?? ""}`.trim();
  }

  getSubtitle(): string {
    return this.major + (this.hometown ? ", " + this.hometown : "");
  }
}

export enum Status {
  PENDING = "pending",
  ACCEPTED = "accepted",
  BLOCKED = "blocked",
  DISMISSED = "dismissed",
  REJECTED = "rejected"
}

export enum InEligibilityReason {}

export type Criteria = {
  eligible: boolean;
  reason?: InEligibilityReason;
};

export class RelationModel {
  id!: number;
  userId: number = 0;
  matchScore?: number;
  user?: RelationUser;
  createdAt: string = "";
  updatedAt: string = "";
  status?: Status;
  isRoommate!: EIntBoolean;
  isFriend!: EIntBoolean;
  criteria?: Criteria;

  constructor(relationModel: RelationModel) {
    Object.assign(this, relationModel);
    this.user = Object.assign(new RelationUser(), this.user);
  }

  getType(): RelationType {
    if (this.isRoommate === EIntBoolean.TRUE) {
      return RelationType.ROOMMATE;
    } else if (
      this.isFriend === EIntBoolean.TRUE &&
      (this.status === Status.ACCEPTED || this.status === Status.REJECTED)
    ) {
      if (this.criteria !== null && this.criteria?.eligible === false) {
        return RelationType.NOT_ELIGIBLE;
      } else {
        return RelationType.FRIEND;
      }
    } else if (
      this.isFriend === EIntBoolean.TRUE &&
      this.status === Status.PENDING &&
      this.criteria !== null &&
      this.criteria?.eligible === false
    ) {
      return RelationType.REQUEST_RECEIVED;
    } else if (this.status === Status.PENDING) {
      return RelationType.FRIEND_REQUESTED;
    } else if (this.status === Status.DISMISSED) {
      return RelationType.DISMISSED;
    } else if (this.status === Status.BLOCKED) {
      return RelationType.BLOCKED;
    } else {
      return RelationType.NOT_FRIEND;
    }
  }
}

export default RelationModel;
