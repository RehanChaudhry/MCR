import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";

export type MatchesStackParamList = {
  Matches: undefined;
  MatchInfo: undefined;
  Chat: { title: string[]; conversationId: number };
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
  RoommateAgreement: { isFrom: EScreen };
  UpdateProfile: { isFrom: EScreen };
  Questionnaire: { isFrom: EScreen };
  AgreementDetails: {
    agreementData?: AgreementData;
  };
  ConnectRequests: { title: string; type: ConnectRequestType };
};

export const MatchesStack = createStackNavigator<MatchesStackParamList>();
