import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type ProfileStackParamList = {
  ViewProfile: undefined;
  UpdateProfile: undefined;
  UpdateQuestionnaire: undefined;
  AccountSettings: undefined;
};

export const ProfileBottomBar = createBottomTabNavigator<ProfileStackParamList>();
