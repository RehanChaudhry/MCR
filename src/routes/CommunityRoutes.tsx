import React from "react";
import { CommunityStack } from "routes/CommunityStack";
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
    </CommunityStack.Navigator>
  );
};

export default CommunityRoutes;
