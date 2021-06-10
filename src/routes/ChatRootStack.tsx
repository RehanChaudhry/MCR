import { createStackNavigator } from "@react-navigation/stack";

export type ChatRootStackParamList = {
  Root: undefined;
  NewConversation: undefined;
  ChatThread: {
    title: string[];
    conversationId: number;
    isArchived?: boolean;
    callback?: (isArchived: boolean, conversationId: number) => void;
  };
};

export const ChatRootStack = createStackNavigator<ChatRootStackParamList>();
