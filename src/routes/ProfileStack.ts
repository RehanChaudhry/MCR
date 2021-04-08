import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";

export type ViewProfileStackParamList = {
  ViewProfile: { isFrom: EScreen };
};
export const ViewProfileStack = createStackNavigator<ViewProfileStackParamList>();

export type UpdateProfileStackParamList = {
  UpdateProfile: {
    isFrom: EScreen;
    options?: string[];
    list?: ConversationItem[];
  };
  AddInterests: { list: ConversationItem[] };
};
export const UpdateProfileStack = createStackNavigator<UpdateProfileStackParamList>();

export type UpdateQuestionnaireStackParamList = {
  UpdateQuestionnaire: { isFrom: EScreen };
};
export const UpdateQuestionnaireStack = createStackNavigator<UpdateQuestionnaireStackParamList>();
