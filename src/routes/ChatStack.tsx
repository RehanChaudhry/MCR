import { createStackNavigator } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

export type ChatParamsList = {
  ChatThread: {
    title: string[];
  };
  NewConversation: undefined;
};

export const ChatStack = createStackNavigator<ChatParamsList>();

export type ChatRouteProps<
  RouteName extends keyof ChatParamsList
> = RouteProp<ChatParamsList, RouteName>;
