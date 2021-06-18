import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

export type NotificationParamList = {
  Notification: undefined;
  ViewProfile: { isFrom: EScreen; updateProfile: boolean };
  ConnectRequest: { title: string; type: ConnectRequestType };
  Chat: undefined;
};

export const NotificationStack = createStackNavigator<NotificationParamList>();
