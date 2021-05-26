import { createStackNavigator } from "@react-navigation/stack";

export type CommunityStackParamList = {
  Community: { postId?: number };
  CreatePost: undefined;
  Comments: { postId: number };
  ReportContent: { postId: number };
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
