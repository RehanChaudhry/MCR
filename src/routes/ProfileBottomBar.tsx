import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export type ProfileStackParamList = {
  ViewProfile: undefined;
  UpdateProfile: undefined;
  UpdateQuestionnaire: { isUpdating: boolean };
  AccountSettings: undefined;
};

export const ProfileBottomBar = createBottomTabNavigator<ProfileStackParamList>();
