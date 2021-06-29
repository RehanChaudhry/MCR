import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EScreen from "models/enums/EScreen";

export type FriendsStackParamList = {
  MyFriends: { isFrom: EScreen };
  MyRoommates: { isFrom: EScreen };
  RoommateAgreement: { isFrom: EScreen };
  DismissedOrBlocked: { isFrom: EScreen };
};

export const FriendsBottomBar = createBottomTabNavigator<FriendsStackParamList>();
