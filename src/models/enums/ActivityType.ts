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
      text: "All Activities",
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
    },
    {
      text: "blocked",
      value: "Blocked"
    }
  ];

  return filters;
};

export default ActivityType;
