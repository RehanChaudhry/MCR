import { createStackNavigator } from "@react-navigation/stack";

export type FriendsRootStackParamList = {
  Root: undefined;
  FriendRequests: undefined;
  RoommateRequests: undefined;
};

export const FriendsRootStack = createStackNavigator<FriendsRootStackParamList>();
