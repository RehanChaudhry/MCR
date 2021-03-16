import { createDrawerNavigator } from "@react-navigation/drawer";

export type HomeDrawerParamList = {
  Matches: undefined;
  Community: undefined;
  Profile: undefined;
};

export const HomeDrawer = createDrawerNavigator<HomeDrawerParamList>();
