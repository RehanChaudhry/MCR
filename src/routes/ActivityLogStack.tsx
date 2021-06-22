import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type ActivityLogStackParamList = {
  ActivityLog: undefined;
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
  SinglePost: { postId: number };
};

export const ActivityLogStack = createStackNavigator<ActivityLogStackParamList>();
