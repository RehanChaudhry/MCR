import { createStackNavigator } from "@react-navigation/stack";

export type ChatRootStackParamList = {
  Root: undefined;
  NewConversation: undefined;
  ChatThread: { title: string[] };
};

export const ChatRootStack = createStackNavigator<ChatRootStackParamList>();
