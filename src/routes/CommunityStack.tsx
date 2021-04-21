import { createStackNavigator } from "@react-navigation/stack";

export type CommunityStackParamList = {
  Community: undefined;
  CreatePost: undefined;
  Comments: { postId: number };
  ReportContent: undefined;
};

export const CommunityStack = createStackNavigator<CommunityStackParamList>();
