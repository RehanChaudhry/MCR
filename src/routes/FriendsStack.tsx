import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type MyFriendsStackParamList = {
  MyFriends: undefined;
};
export const MyFriendsStack = createStackNavigator<MyFriendsStackParamList>();

export type MyRoomMatesStackParamList = {
  MyRoommates: undefined;
};
export const MyRoommatesStack = createStackNavigator<MyRoomMatesStackParamList>();

export type RoommateAgreementStackParamList = {
  RoommateAgreement: { isFrom: EScreen };
};
export const RoommateAgreementStack = createStackNavigator<RoommateAgreementStackParamList>();

export type DismissedOrBlockStackParamList = {
  DismissedOrBlocked: undefined;
};
export const DismissedOrBlockStack = createStackNavigator<DismissedOrBlockStackParamList>();
