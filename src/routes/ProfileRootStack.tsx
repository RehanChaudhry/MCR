import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type ProfileRootStackParamList = {
  RoommateAgreement: { isFrom: EScreen };
};

export const ProfileRootStack = createStackNavigator<ProfileRootStackParamList>();
