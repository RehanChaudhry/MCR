import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";

export type ViewProfileStackParamList = {
  ViewProfile: { isFrom: EScreen; updateProfile: boolean };
};
export const ViewProfileStack = createStackNavigator<ViewProfileStackParamList>();

export type UpdateProfileStackParamList = {
  UpdateProfile: {
    isFrom: EScreen;
    list?: ConversationItem[];
    listKey?: string;
    updateProfile: boolean;
  };
  AddInterests: {
    list: ConversationItem[];
    listKey?: string;
    title?: string;
  };
};
export const UpdateProfileStack = createStackNavigator<UpdateProfileStackParamList>();

export type UpdateQuestionnaireStackParamList = {
  UpdateQuestionnaire: { isFrom: EScreen };
};
export const UpdateQuestionnaireStack = createStackNavigator<UpdateQuestionnaireStackParamList>();
