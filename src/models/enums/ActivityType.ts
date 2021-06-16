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
  const filters: DropDownItem[] = [
    {
      text: "",
      value: "All Activities"
    },
    {
      text: "comment",
      value: "Comment"
    },
    {
      text: "conversation",
      value: "Conversation"
    },
    {
      text: "dismissed",
      value: "Dismissed"
    },
    {
      text: "friend-request",
      value: "Friend Request"
    },
    {
      text: "post",
      value: "Create Post"
    },
    {
      text: "profile",
      value: "Update Profile"
    },
    {
      text: "questionnaire",
      value: "Update Questionnaire"
    },
    {
      text: "restored",
      value: "Restored"
    },
    {
      text: "roommate-agreement",
      value: "Roommate Agreement"
    },
    {
      text: "roommate-request",
      value: "Roommate Request"
    },
    {
      text: "student",
      value: "Login"
    }
  ];

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
