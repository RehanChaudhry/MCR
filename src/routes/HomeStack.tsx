import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { ConnectRequestType } from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import { NavigatorScreenParams } from "@react-navigation/native";
import { HomeDrawerParamList } from "./HomeDrawerStack";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";
import { ConversationItem } from "models/ConversationItem";
import { PostFeed } from "models/api_responses/FetchPostFeedListResponseModel";
import React from "react";
import { View } from "react-native";

export type HomeStackParamList = {
  DrawerRoutes: NavigatorScreenParams<HomeDrawerParamList>;

  MatchInfo: undefined;

  ConnectRequest: { type: ConnectRequestType };
  MyFriends: { isFrom: EScreen };
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: { isFrom: EScreen };
  DismissedOrBlocked: { isFrom: EScreen };

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
    viewShotRef: React.MutableRefObject<View | null | undefined>;
  };
  AddInterests: {
    list: ConversationItem[];
    listKey?: string;
    title?: string;
  };

  Community: { postId?: number };
  Announcement: { postId?: number };

  ActivityLog: undefined;
  CreatePost: {
    postCreatedSuccessfully?: () => void;
    isEditPost?: boolean;
    postFeed?: PostFeed;
  };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number; callback: () => void };
  SinglePost: { postId: number; isFrom: EScreen };

  StaticContent: { isFrom: EScreen; staticContent: StaticContent };

  SeeLikes: { postId: number };
};

export const HomeStack = createStackNavigator<HomeStackParamList>();
