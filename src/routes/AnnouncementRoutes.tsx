import React from "react";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import { AnnouncementStack } from "./AnnouncementStack";

const AnnouncementRoutes = () => {
  return (
    <AnnouncementStack.Navigator initialRouteName={"Announcement"}>
      <AnnouncementStack.Screen
        name="Announcement"
        component={AnnouncementController}
      />
    </AnnouncementStack.Navigator>
  );
};

export default AnnouncementRoutes;
