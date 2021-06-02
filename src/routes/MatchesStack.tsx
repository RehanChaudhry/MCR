import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
  Chat: { title: string[] };
  Profile: { isFrom: EScreen; updateProfile: boolean };
  RoommateAgreement: { isFrom: EScreen };
  UpdateProfile: { isFrom: EScreen };
  Questionnaire: { isFrom: EScreen };
  AgreementDetails: undefined;
  ConnectRequests: { title: string; type: ConnectRequestType };
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
