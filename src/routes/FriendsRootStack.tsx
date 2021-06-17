import { createStackNavigator } from "@react-navigation/stack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import EScreen from "models/enums/EScreen";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";
import { Conversation } from "models/api_responses/ChatsResponseModel";

export type FriendsRootStackParamList = {
  Root: undefined;
  ConnectRequests: { title: string; type: ConnectRequestType };
  AgreementDetails: {
    agreementData?: AgreementData;
  };
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
  Chat: { title: string[]; conversation: Conversation };
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
