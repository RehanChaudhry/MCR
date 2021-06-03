import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type ChatBottomBarParamsList = {
  Active: { status: string };
  Archive: { status: string };
};

export const ChatBottomBar = createBottomTabNavigator<ChatBottomBarParamsList>();
