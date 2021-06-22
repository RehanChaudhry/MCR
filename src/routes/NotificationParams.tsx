import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

export type NotificationParamList = {
  Notification: undefined;
  ViewProfile: { isFrom: EScreen; updateProfile: boolean };
  ConnectRequest: { title: string; type: ConnectRequestType };
  Chat: undefined;
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: { isFrom: EScreen };
  SinglePost: { postId: number };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number; callback: () => void };
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
  Community: { postId?: number };
};

export const NotificationStack = createStackNavigator<NotificationParamList>();
