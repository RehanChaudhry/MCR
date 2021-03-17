import { createStackNavigator } from "@react-navigation/stack";

export type ChatParamsLIst = {
  ChatThread: undefined;
};

export const ProfileBottomBar = createStackNavigator<ChatParamsLIst>();
