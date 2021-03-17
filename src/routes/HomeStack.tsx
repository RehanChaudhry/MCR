import { createStackNavigator } from "@react-navigation/stack";

export type HomeStackParamList = {
  Home: undefined;
  Questions: undefined;
};

export const HomeStack = createStackNavigator<HomeStackParamList>();
