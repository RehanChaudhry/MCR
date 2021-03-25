import { createStackNavigator } from "@react-navigation/stack";

export type WelcomeStackParamList = {
  Welcome: undefined;
};

export const WelcomeStack = createStackNavigator<WelcomeStackParamList>();
