import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type ViewProfileStackParamList = {
  ViewProfile: undefined;
};
export const ViewProfileStack = createStackNavigator<ViewProfileStackParamList>();

export type UpdateProfileStackParamList = {
  UpdateProfile: { isFrom: EScreen };
};
export const UpdateProfileStack = createStackNavigator<UpdateProfileStackParamList>();

export type UpdateQuestionnaireStackParamList = {
  UpdateQuestionnaire: { isFrom: EScreen };
};
export const UpdateQuestionnaireStack = createStackNavigator<UpdateQuestionnaireStackParamList>();
