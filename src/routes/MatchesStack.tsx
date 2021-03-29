import { createStackNavigator } from "@react-navigation/stack";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
  Chat: { title: string[] };
  Profile: undefined;
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
