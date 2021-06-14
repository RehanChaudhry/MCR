import EScreen from "models/enums/EScreen";
import React from "react";
import { CommunityStack } from "routes/CommunityStack";
import { CommentsController } from "ui/screens/home/comments/CommentsController";
import CommunityController from "ui/screens/home/community/CommunityController";
import CreatePostController from "ui/screens/home/community/create_post/CreatePostController";
import ReportContentController from "ui/screens/home/community/report_content/ReportContentController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";

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
      <CommunityStack.Screen
        name="Profile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.COMMUNITY }}
        options={{ title: "View Profile" }}
      />
    </CommunityStack.Navigator>
  );
};

export default CommunityRoutes;
