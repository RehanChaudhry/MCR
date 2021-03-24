import React from "react";
import { ChatRoutes } from "routes/ChatRoutes";
import { HomeDrawer } from "routes/HomeDrawer";
import { NotificationRoutes } from "routes/NotificationRoutes";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import CommunityController from "ui/screens/home/community/CommunityController";
import MatchesController from "ui/screens/home/matches/MatchesController";
import ProfileController from "ui/screens/home/profile/ProfileController";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator initialRouteName="Profile">
      <HomeDrawer.Screen name="Matches" component={MatchesController} />
      <HomeDrawer.Screen
        name="Community"
        component={CommunityController}
      />
      <HomeDrawer.Screen
        name="Announcement"
        component={AnnouncementController}
      />
      <HomeDrawer.Screen name="Profile" component={ProfileController} />
      <HomeDrawer.Screen name="ChatList" component={ChatRoutes} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationRoutes}
      />
    </HomeDrawer.Navigator>
  );
};
