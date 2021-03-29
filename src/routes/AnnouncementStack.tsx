import { createStackNavigator } from "@react-navigation/stack";

export type AnnouncementStackParamList = {
  Announcement: undefined;
  Comments: undefined;
};

export const AnnouncementStack = createStackNavigator<AnnouncementStackParamList>();
