import { createStackNavigator } from "@react-navigation/stack";

export type ActivityLogStackParamList = {
  ActivityLog: undefined;
};

export const ActivityLogStack = createStackNavigator<ActivityLogStackParamList>();
