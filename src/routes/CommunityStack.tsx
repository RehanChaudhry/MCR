import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type CommunityStackParamList = {
  Community: { postId?: number };
  CreatePost: { postCreatedSuccessfully?: () => void };
  Comments: { postId: number; callback: () => void };
  ReportContent: { postId: number };
  Profile: { isFrom: EScreen; updateProfile: boolean; userId: number };
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
