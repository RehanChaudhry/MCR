import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Questionnaire: { isFrom: EScreen };
  Matches: undefined;
  UpdateProfile: { isFrom: EScreen };
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
