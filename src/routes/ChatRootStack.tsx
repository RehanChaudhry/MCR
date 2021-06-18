import { createStackNavigator } from "@react-navigation/stack";
import { Conversation } from "models/api_responses/ChatsResponseModel";

export type ChatRootStackParamList = {
  Root: undefined;
  NewConversation: undefined;
  ChatThread: {
    title: string[];
    conversation: Conversation;
  };
};

export const ChatRootStack = createStackNavigator<ChatRootStackParamList>();
