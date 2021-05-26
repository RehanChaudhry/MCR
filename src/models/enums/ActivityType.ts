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
    title: "Roommate Agreement",
    id: ActivityType.ROMMATE_AGREEMENT
  });

  filters.push({
    title: "Friend Request",
    id: ActivityType.FRIEND_REQUEST
  });
  filters.push({
    title: "Dismissed",
    id: ActivityType.DISMISSED
  });
  filters.push({
    title: "Roommate Request",
    id: ActivityType.ROOMMATE_REQUEST
  });
  filters.push({
    title: "Updated Profile",
    id: ActivityType.UPDATED_PROFILE
  });
  return filters;
};

export default ActivityType;
