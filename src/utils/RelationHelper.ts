import RelationModel, { Status } from "models/RelationModel";
import EIntBoolean from "models/enums/EIntBoolean";

export enum RelationType {
  BLOCKED,
  DISMISSED,
  NONE,
  FRIEND,
  ROOMMATE
}

export enum ActionPerformed {
  NONE,
  FRIEND_REQUESTED,
  FRIEND_REQUEST_RECEIVED,
  ROOMMATE_REQUESTED,
  ROOMMATE_REQUESTED_RECEIVED
}

export enum Eligible {
  NONE,
  IS_ELIGIBLE,
  NOT_ELIGIBLE
}

const getRelationStatus = (relationModel: RelationModel) => {
  let relationType = RelationType.NONE,
    actionPerformed = ActionPerformed.NONE,
    eligible = Eligible.NONE;
  if (relationModel.isRoommate === EIntBoolean.TRUE) {
    relationType = RelationType.ROOMMATE;
  } else if (relationModel.isFriend === EIntBoolean.TRUE) {
    relationType = RelationType.FRIEND;

    // when already a friend, request will be a roommate
    if (relationModel.status === Status.PENDING) {
      if (relationModel.acceptee === relationModel.userId) {
        actionPerformed = ActionPerformed.ROOMMATE_REQUESTED;
      } else {
        actionPerformed = ActionPerformed.ROOMMATE_REQUESTED_RECEIVED;
      }
    } else {
      // when already a friend and roommate request not sent
      // Can request be sent?
      if (relationModel?.criteria?.eligible === true) {
        eligible = Eligible.IS_ELIGIBLE;
      } else {
        eligible = Eligible.NOT_ELIGIBLE;
      }
    }
  } else if (relationModel.status === Status.DISMISSED) {
    relationType = RelationType.DISMISSED;
  } else if (relationModel.status === Status.BLOCKED) {
    relationType = RelationType.BLOCKED;
  } else {
    if (relationModel.status === Status.PENDING) {
      if (relationModel.acceptee === relationModel.userId) {
        actionPerformed = ActionPerformed.FRIEND_REQUESTED;
      } else {
        actionPerformed = ActionPerformed.FRIEND_REQUEST_RECEIVED;
      }
    }
  }

  return { relationType, actionPerformed, eligible };
};

export default getRelationStatus;
