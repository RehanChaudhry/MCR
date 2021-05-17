import { createStackNavigator } from "@react-navigation/stack";

export type ChatRootStackParamList = {
  Root: undefined;
  NewConversation: undefined;
  ChatThread: { title: string[]; conversationId: number };
};

export const ChatRootStack = createStackNavigator<ChatRootStackParamList>();
