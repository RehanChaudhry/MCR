import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type ActivityLogStackParamList = {
  ActivityLog: undefined;
  Profile: {
    isFrom: EScreen;
    updateProfile: boolean;
    userId: number;
    userName?: string;
  };
  SinglePost: { postId: number; isFrom: EScreen };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number; callback: () => void };
};

export const ActivityLogStack = createStackNavigator<ActivityLogStackParamList>();
