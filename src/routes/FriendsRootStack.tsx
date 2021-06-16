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
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
  Chat: { title: string[]; conversationId: number };
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
