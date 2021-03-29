import { createStackNavigator } from "@react-navigation/stack";

export type ConnectionRequestStackParamList = {
  FriendRequests: undefined;
  RoommateRequests: undefined;
};

export const ConnectionRequestStack = createStackNavigator<ConnectionRequestStackParamList>();
