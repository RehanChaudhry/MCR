import { createStackNavigator } from "@react-navigation/stack";
import EScreen from "models/enums/EScreen";

export type CommunityStackParamList = {
  Community: { postId?: number };
  CreatePost: { postCreatedSuccessfully?: () => void };
  Comments: { postId: number };
  ReportContent: { postId: number };
  Profile: { isFrom: EScreen };
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
