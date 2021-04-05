import React from "react";
import { CommunityStack } from "routes/CommunityStack";
import { CommentsController } from "ui/screens/home/comments/CommentsController";
import CommunityController from "ui/screens/home/community/CommunityController";
import CreatePostController from "ui/screens/home/community/create_post/CreatePostController";
import ReportContentController from "ui/screens/home/community/report_content/ReportContentController";

const CommunityRoutes = () => {
  return (
    <CommunityStack.Navigator initialRouteName={"Community"}>
      <CommunityStack.Screen
        name="Community"
        component={CommunityController}
      />
      <CommunityStack.Screen
        name="CreatePost"
        component={CreatePostController}
      />
      <CommunityStack.Screen
        name="Comments"
        component={CommentsController}
      />
      <CommunityStack.Screen
        name="ReportContent"
        component={ReportContentController}
      />
    </CommunityStack.Navigator>
  );
};

export default CommunityRoutes;
