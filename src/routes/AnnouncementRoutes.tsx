import React from "react";
import { CommunityStack } from "routes/CommunityStack";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import { CommentsController } from "ui/screens/home/comments/commentsController";
import { AnnouncementStack } from "./AnnouncementStack";

const AnnouncementRoutes = () => {
  return (
    <AnnouncementStack.Navigator initialRouteName={"Announcement"}>
      <AnnouncementStack.Screen
        name="Announcement"
        component={AnnouncementController}
      />
      <CommunityStack.Screen
        name="Comments"
        component={CommentsController}
      />
    </AnnouncementStack.Navigator>
  );
};

export default AnnouncementRoutes;
