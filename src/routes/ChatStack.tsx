import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import { Conversation } from "models/api_responses/ChatsResponseModel";

export type ChatParamsList = {
  ChatThread: {
    title: string[];
    conversation: Conversation;
  };
  NewConversation: undefined;
};

export const ChatStack = createStackNavigator<ChatParamsList>();

export type ChatRouteProps<
  RouteName extends keyof ChatParamsList
> = RouteProp<ChatParamsList, RouteName>;
