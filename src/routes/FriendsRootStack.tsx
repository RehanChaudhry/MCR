import { createStackNavigator } from "@react-navigation/stack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import EScreen from "models/enums/EScreen";

export type FriendsRootStackParamList = {
  Root: undefined;
  ConnectRequests: { title: string; type: ConnectRequestType };
  AgreementDetails: undefined;
  Profile: { isFrom: EScreen };
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
