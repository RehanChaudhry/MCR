import { DropDownItem } from "models/DropDownItem";

enum ActivityType {
  FRIEND_REQUEST_SENT = "matches",
  ADDED_TO_DISMISSED = "dismissed",
  CREATED_CONVERSATION = "conversation"
}

export const getActivityTypeFilterData = () => {
  const filters: DropDownItem[] = [];

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
