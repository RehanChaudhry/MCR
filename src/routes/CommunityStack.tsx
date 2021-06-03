import { createStackNavigator } from "@react-navigation/stack";

export type CommunityStackParamList = {
  Community: { postId?: number };
  CreatePost: { postCreatedSuccessfully?: () => void };
  Comments: { postId: number };
  ReportContent: { postId: number };
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
