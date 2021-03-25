import { createStackNavigator } from "@react-navigation/stack";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
