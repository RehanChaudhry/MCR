import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
  Chat: { title: string[] };
  Profile: { isFrom: EScreen };
  RoommateAgreement: undefined;
  UpdateProfile: { isFrom: EScreen };
  Questionnaire: { isFrom: EScreen };
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
