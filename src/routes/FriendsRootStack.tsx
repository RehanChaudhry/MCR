import { createStackNavigator } from "@react-navigation/stack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import EScreen from "models/enums/EScreen";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";

export type FriendsRootStackParamList = {
  Root: undefined;
  ConnectRequests: { title: string; type: ConnectRequestType };
  AgreementDetails: {
    agreementData?: AgreementData;
  };
  Profile: { isFrom: EScreen };
  Chat: { title: string[]; conversationId: number; isArchived?: boolean };
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
