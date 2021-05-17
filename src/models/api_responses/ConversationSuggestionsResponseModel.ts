import { User } from "models/User";

export type ConversationSuggestionsResponseModel = {
  message: string;
  data: User[];
};
