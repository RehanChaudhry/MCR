import React from "react";
import { CommunityStack } from "routes/CommunityStack";
import { CommentsController } from "ui/screens/home/comments/commentsController";
import CommunityController from "ui/screens/home/community/CommunityController";
import CreatePostController from "ui/screens/home/community/create_post/CreatePostController";

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
    </CommunityStack.Navigator>
  );
};

export default CommunityRoutes;
