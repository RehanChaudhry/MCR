import { createDrawerNavigator } from "@react-navigation/drawer";

export type HomeDrawerParamList = {
  Matches: undefined;
  Community: undefined;
  Profile: undefined;
  ChatList: undefined;
  Notification: undefined;
};

export const HomeDrawer = createDrawerNavigator<HomeDrawerParamList>();
