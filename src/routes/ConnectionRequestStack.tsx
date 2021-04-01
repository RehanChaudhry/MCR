import { createStackNavigator } from "@react-navigation/stack";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

export type ConnectionRequestStackParamList = {
  FriendRequests: { title: string; type: ConnectRequestType };
  RoommateRequests: undefined;
};

export const ConnectionRequestStack = createStackNavigator<ConnectionRequestStackParamList>();
