import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { Conversation } from "models/api_responses/ChatsResponseModel";

export type NotificationParamList = {
  Notification: undefined;
  ViewProfile: {
    isFrom: EScreen;
    updateProfile: boolean;
  };
  ConnectRequest: { title: string; type: ConnectRequestType };
  ChatThread: {
    title: string[];
    conversation: Conversation;
  };
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: { isFrom: EScreen };
  SinglePost: { postId: number; isFrom: EScreen };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number; callback: () => void };
  Profile: {
    isFrom: EScreen;
    updateProfile: boolean;
    userId: number;
    userName?: string;
  };
  Community: { postId?: number };
};

export const NotificationStack = createStackNavigator<NotificationParamList>();
