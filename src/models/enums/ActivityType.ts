import { DropDownItem } from "models/DropDownItem";

enum ActivityType {
  ROMMATE_AGREEMENT = "roomate-agreement",
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
    text: "Roommate Agreement",
    value: ActivityType.ROMMATE_AGREEMENT
  });

  filters.push({
    text: "Friend Request",
    value: ActivityType.FRIEND_REQUEST
  });
  filters.push({
    text: "Dismissed",
    value: ActivityType.DISMISSED
  });
  filters.push({
    text: "Roommate Request",
    value: ActivityType.ROOMMATE_REQUEST
  });
  filters.push({
    text: "Updated Profile",
    value: ActivityType.UPDATED_PROFILE
  });
  return filters;
};

export default ActivityType;
