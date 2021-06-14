import EScreen from "models/enums/EScreen";
import React from "react";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import { CommentsController } from "ui/screens/home/comments/CommentsController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import { AnnouncementStack } from "./AnnouncementStack";

const AnnouncementRoutes = () => {
  return (
    <AnnouncementStack.Navigator initialRouteName={"Announcement"}>
      <AnnouncementStack.Screen
        name="Announcement"
        component={AnnouncementController}
      />
      <AnnouncementStack.Screen
        name="Comments"
        component={CommentsController}
      />
      <AnnouncementStack.Screen
        name="Profile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.ANNOUNCEMENT }}
        options={{ title: "View Profile" }}
      />
    </AnnouncementStack.Navigator>
  );
};

export default AnnouncementRoutes;
