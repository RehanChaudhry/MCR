import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type NotificationParamList = {
  Notification: undefined;
  ViewProfile: { isFrom: EScreen };
};

export const NotificationStack = createStackNavigator<NotificationParamList>();
