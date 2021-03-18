import { createStackNavigator } from "@react-navigation/stack";

export type NotificationParamList = {
  Notification: undefined;
};

export const ProfileBottomBar = createStackNavigator<NotificationParamList>();
