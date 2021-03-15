import { createStackNavigator } from "@react-navigation/stack";

export type ProfileStackParamList = {
  ViewProfile: undefined;
  UpdateProfile: undefined;
  UpdateQuestionnaire: undefined;
  AccountSettings: undefined;
};

export const ProfileStack = createStackNavigator<ProfileStackParamList>();
