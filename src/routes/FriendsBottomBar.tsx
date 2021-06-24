import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EScreen from "models/enums/EScreen";

export type FriendsStackParamList = {
  MyFriends: undefined;
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: undefined;
  DismissedOrBlocked: undefined;
};

export const FriendsBottomBar = createBottomTabNavigator<FriendsStackParamList>();
