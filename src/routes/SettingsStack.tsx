import { createStackNavigator } from "@react-navigation/stack";

export type SettingsStackParamList = {
  Settings: undefined;
};

export const SettingsStack = createStackNavigator<SettingsStackParamList>();
