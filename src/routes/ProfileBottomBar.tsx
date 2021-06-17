import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EScreen from "models/enums/EScreen";

export type ProfileStackParamList = {
  ViewProfile: { isFrom: EScreen; userId?: number };
  UpdateProfile: { isFrom: EScreen };
  UpdateQuestionnaire: undefined;
};

export const ProfileBottomBar = createBottomTabNavigator<ProfileStackParamList>();
