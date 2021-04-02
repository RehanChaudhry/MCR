import { DropDownItem } from "models/DropDownItem";

enum ActivityType {
  ALL = "",
  FRIEND_REQUEST_SENT = "matches",
  ADDED_TO_DISMISSED = "dismissed",
  CREATED_CONVERSATION = "conversation",
  CREATED_POST = "post",
  ROOMMATE_REQUEST_SENT = "roommate",
  UPDATED_QUESTIONNAIRE = "questionnare",
  UPDATED_PROFILE = "profile",
  UPDATED_AGREEMENT = "agreement",
  COMMENT = "comment"
}

export const getActivityTypeFilterData = () => {
  const filters: DropDownItem[] = [];

  filters.push({
    title: "Filter by activity log",
    id: ActivityType.ALL
  });

  filters.push({
    title: "Friend Request Sent",
    id: ActivityType.FRIEND_REQUEST_SENT
  });
  filters.push({
    title: "Dismissed",
    id: ActivityType.ADDED_TO_DISMISSED
  });
  filters.push({
    title: "Conversation Created",
    id: ActivityType.CREATED_CONVERSATION
  });
  return filters;
};

export default ActivityType;
