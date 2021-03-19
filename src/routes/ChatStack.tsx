import { createStackNavigator } from "@react-navigation/stack";

export type ChatParamsLIst = {
  ChatThread: undefined;
  NewConversation: undefined;
};

export const ChatStack = createStackNavigator<ChatParamsLIst>();
