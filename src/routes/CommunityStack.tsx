import { createStackNavigator } from "@react-navigation/stack";

export type CommunityStackParamList = {
  Community: undefined;
  CreatePost: undefined;
  Comments: { postId: number };
  ReportContent: { postId: number };
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
