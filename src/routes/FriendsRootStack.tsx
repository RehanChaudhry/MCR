import { createStackNavigator } from "@react-navigation/stack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

export type FriendsRootStackParamList = {
  Root: undefined;
  ConnectRequests: { title: string; type: ConnectRequestType };
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
