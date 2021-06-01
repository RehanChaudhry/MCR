import { DropDownItem } from "models/DropDownItem";

enum ActivityType {
  ROMMATE_AGREEMENT = "roommate-agreement",
  FRIEND_REQUEST = "friend-request",
  DISMISSED = "dismissed",
  UPDATED_PROFILE = "updated-profile",
  CREATED_CONVERSATION = "conversation",
  CREATED_POST = "post",
  ROOMMATE_REQUEST = "roommate-request",
  UPDATED_QUESTIONNAIRE = "questionnare",
  UPDATED_AGREEMENT = "agreement",
  COMMENT = "comment"
}

export const getActivityTypeFilterData = () => {
  const filters: DropDownItem[] = [];

  filters.push({
    text: ActivityType.ROMMATE_AGREEMENT,
    value: "Roommate Agreement"
  });

  filters.push({
    text: ActivityType.FRIEND_REQUEST,
    value: "Friend Request"
  });
  filters.push({
    text: ActivityType.DISMISSED,
    value: "Dismissed"
  });
  filters.push({
    text: ActivityType.ROOMMATE_REQUEST,
    value: "Roommate Request"
  });
  filters.push({
    text: ActivityType.UPDATED_PROFILE,
    value: "Updated Profile"
  });
  return filters;
};

export default ActivityType;
