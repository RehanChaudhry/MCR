import { createStackNavigator } from "@react-navigation/stack";

export type ChatRootStackParamList = {
  Root: undefined;
  NewConversation: undefined;
  ChatThread: {
    title: string[];
    conversationId: number;
    isArchived?: boolean;
  };
};

export const ChatRootStack = createStackNavigator<ChatRootStackParamList>();
