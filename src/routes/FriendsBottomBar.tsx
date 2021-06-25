import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type FriendsStackParamList = {
  MyFriends: undefined;
  MyRoommates: undefined;
  RoommateAgreement: undefined;
  DismissedOrBlocked: undefined;
};

export const FriendsBottomBar = createBottomTabNavigator<FriendsStackParamList>();
