import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type AnnouncementStackParamList = {
  Announcement: undefined;
  Comments: { postId: number };
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
};

export const AnnouncementStack = createStackNavigator<AnnouncementStackParamList>();
