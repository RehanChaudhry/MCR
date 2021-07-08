export enum StaticContentType {
  WELCOME_GUIDE = "welcome-guide",
  QUESTIONNAIRE = "questionnaire",
  ROOMMATE_MATCHING = "roommate-matching",
  DISMISSED_LIST = "dismissed-list",
  BLOCKED_LIST = "blocked-list"
}

type StaticContentRequestModel = {
  type: StaticContentType;
};

export default StaticContentRequestModel;
