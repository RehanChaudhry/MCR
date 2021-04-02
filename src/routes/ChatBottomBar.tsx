import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type ChatBottomBarParamsList = {
  Active: undefined;
  Archive: undefined;
};

export const ChatBottomBar = createBottomTabNavigator<ChatBottomBarParamsList>();
