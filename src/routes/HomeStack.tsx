import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeDrawerParamList } from "./HomeDrawerStack";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";
import { ConversationItem } from "models/ConversationItem";

export type HomeStackParamList = {
  DrawerRoutes: NavigatorScreenParams<HomeDrawerParamList>;

  MatchInfo: undefined;

  ConnectRequest: { title: string; type: ConnectRequestType };
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: { isFrom: EScreen };

  ChatThread: {
    title: string[];
    conversation: Conversation;
  };
  NewConversation: undefined;

  ViewProfile: {
    isFrom: EScreen;
    userId: number;
    userName?: string;
  };
  UpdateProfile: { isFrom: EScreen };
  Questionnaire: { isFrom: EScreen };
  AgreementDetails: {
    agreementData?: AgreementData;
  };
  AddInterests: {
    list: ConversationItem[];
    listKey?: string;
    title?: string;
  };

  Community: { postId?: number };
  Announcement: { postId?: number };

  ActivityLog: undefined;
  CreatePost: { postCreatedSuccessfully?: () => void };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number; callback: () => void };
  SinglePost: { postId: number; isFrom: EScreen };

  StaticContent: { isFrom: EScreen; staticContent: StaticContent };
};

export const HomeStack = createStackNavigator<HomeStackParamList>();
