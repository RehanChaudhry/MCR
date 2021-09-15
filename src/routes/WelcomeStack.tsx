import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConversationItem } from "models/ConversationItem";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";

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
  StaticContent: { isFrom: EScreen; staticContent: StaticContent };
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
