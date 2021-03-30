import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EScreen from "models/enums/EScreen";

export type ProfileStackParamList = {
  ViewProfile: { isFrom: EScreen };
  UpdateProfile: undefined;
  UpdateQuestionnaire: undefined;
};

export const ProfileBottomBar = createBottomTabNavigator<ProfileStackParamList>();
