import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";

export type MyFriendsStackParamList = {
  MyFriends: undefined;
};
export const MyFriendsStack = createStackNavigator<MyFriendsStackParamList>();

export type MyRoomMatesStackParamList = {
  MyRoommates: { isFrom: EScreen };
};
export const MyRoommatesStack = createStackNavigator<MyRoomMatesStackParamList>();

export type RoommateAgreementStackParamList = {
  RoommateAgreement: { isFrom: EScreen };
};
export const RoommateAgreementStack = createStackNavigator<RoommateAgreementStackParamList>();

export type DismissedOrBlockStackParamList = {
  DismissedOrBlocked: undefined;
  StaticContent: { isFrom: EScreen; staticContent: StaticContent };
};
export const DismissedOrBlockStack = createStackNavigator<DismissedOrBlockStackParamList>();
