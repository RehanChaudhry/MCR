import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
  Chat: { title: string[] };
  Profile: { isFrom: EScreen; updateProfile: boolean };
  RoommateAgreement: { isFrom: EScreen };
  UpdateProfile: { isFrom: EScreen };
  Questionnaire: { isFrom: EScreen };
  AgreementDetails: undefined;
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
