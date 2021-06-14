import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Questionnaire: { isFrom: EScreen };
  Matches: undefined;
  Auth: undefined;
  UpdateProfile: {
    isFrom: EScreen;
    updateProfile: boolean;
    list?: ConversationItem[];
    listKey?: string;
  };
  AddInterests: {
    list: ConversationItem[];
    listKey?: string;
    title?: string;
  };
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
