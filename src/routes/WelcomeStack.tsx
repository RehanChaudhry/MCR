import { createStackNavigator } from "@react-navigation/stack";

export type WelcomeStackParamList = {
  Welcome: undefined;
  Questionnaire: undefined;
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
