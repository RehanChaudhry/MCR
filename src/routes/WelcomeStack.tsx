import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Questionnaire: { isFrom: EScreen };
  Matches: undefined;
  UpdateProfile: { isFrom: EScreen; list?: ConversationItem[] };
  AddInterests: { list: ConversationItem[] };
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
