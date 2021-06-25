import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EScreen from "models/enums/EScreen";

export type ProfileBottomParamList = {
  ViewProfile: { isFrom: EScreen; userId?: number; userName?: string };
  UpdateProfile: { isFrom: EScreen };
  UpdateQuestionnaire: { isFrom: EScreen };
};

export const ProfileBottomBar = createBottomTabNavigator<ProfileBottomParamList>();
