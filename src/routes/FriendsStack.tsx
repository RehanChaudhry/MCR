import { createStackNavigator } from "@react-navigation/stack";

export type MyFriendsStackParamList = {
  MyFriends: undefined;
};
export const MyFriendsStack = createStackNavigator<MyFriendsStackParamList>();

export type MyRoomMatesStackParamList = {
  MyRoommates: undefined;
};
export const MyRoommatesStack = createStackNavigator<MyRoomMatesStackParamList>();

export type RoommateAgreementStackParamList = {
  RoomateAgreement: undefined;
};
export const RoommateAgreementStack = createStackNavigator<RoommateAgreementStackParamList>();

export type DismissedOrBlockStackParamList = {
  DismissedOrBlocked: undefined;
};
export const DismissedOrBlockStack = createStackNavigator<DismissedOrBlockStackParamList>();