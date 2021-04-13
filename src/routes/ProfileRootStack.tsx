import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type ProfileRootStackParamList = {
  Profile: undefined;
  RoommateAgreement: { isFrom: EScreen };
  AgreementDetails: undefined;
};

export const ProfileRootStack = createStackNavigator<ProfileRootStackParamList>();
