import EIntBoolean from "models/enums/EIntBoolean";
import RelationType from "models/enums/RelationType";
import FilePath from "models/FilePath";

export class RelationUser {
  id?: number;
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
  acceptee?: number;
  dismissed?: number;

  constructor(relationModel: RelationModel) {
    Object.assign(this, relationModel);
    this.user = Object.assign(new RelationUser(), this.user);
  }

  getType(): RelationType {
    if (
      !this.isFriend &&
      !this.isRoommate &&
      (!this.status || this.status === "rejected")
    ) {
      return RelationType.NOT_FRIEND;
    }
    if (!this.isFriend && !this.isRoommate && this.status === "pending") {
      return RelationType.FRIEND_REQUESTED;
    }
    if (!this.isFriend && !this.isRoommate && this.status === "pending") {
      return RelationType.FRIEND_REQUESTED;
    }
    if (
      this.isFriend &&
      !this.isRoommate &&
      (this.status === "accepted" || this.status === "rejected") &&
      this.criteria?.eligible
    ) {
      return RelationType.FRIEND;
    }
    if (this.isFriend && !this.isRoommate && this.status === "pending") {
      return RelationType.REQUEST_RECEIVED;
    }
    if (
      this.isFriend &&
      !this.isRoommate &&
      !this.criteria?.eligible &&
      (this.status === "accepted" || this.status === "rejected")
    ) {
      return RelationType.NOT_ELIGIBLE;
    } else {
      return RelationType.FRIEND;
    }

    // if (this.isRoommate === EIntBoolean.TRUE) {
    //   return RelationType.ROOMMATE;
    // } else if (this.criteria?.eligible === false) {
    //   return RelationType.NOT_ELIGIBLE;
    // } else if (this.status === Status.PENDING) {
    //   return RelationType.FRIEND_REQUESTED;
    // } else if (this.isFriend === EIntBoolean.TRUE) {
    //   return RelationType.FRIEND;
    // } else if (this.status === Status.DISMISSED) {
    //   return RelationType.DISMISSED;
    // } else if (this.status === Status.BLOCKED) {
    //   return RelationType.BLOCKED;
    // } else {
    //   return RelationType.NOT_FRIEND;
    // }
  }
}

export default RelationModel;
