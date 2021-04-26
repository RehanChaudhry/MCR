import { createStackNavigator } from "@react-navigation/stack";

export type AnnouncementStackParamList = {
  Announcement: undefined;
  Comments: { postId: number };
};

export const AnnouncementStack = createStackNavigator<AnnouncementStackParamList>();
