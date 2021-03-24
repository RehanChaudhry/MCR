import React from "react";
import { ChatRoutes } from "routes/ChatRoutes";
import { HomeDrawer } from "routes/HomeDrawer";
import { NotificationRoutes } from "routes/NotificationRoutes";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import CommunityController from "ui/screens/home/community/CommunityController";
import FriendsController from "ui/screens/home/friends/FriendsController";
import ProfileController from "ui/screens/home/profile/ProfileController";
import MatchesRoutes from "routes/MatchesRoutes";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator initialRouteName="Matches">
      <HomeDrawer.Screen name="Matches" component={MatchesRoutes} />
      <HomeDrawer.Screen
        name="Community"
        component={CommunityController}
      />
      <HomeDrawer.Screen
        name="Announcement"
        component={AnnouncementController}
      />
      <HomeDrawer.Screen name="Profile" component={ProfileController} />
      <HomeDrawer.Screen name="Friends" component={FriendsController} />
      <HomeDrawer.Screen name="ChatList" component={ChatRoutes} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationRoutes}
      />
    </HomeDrawer.Navigator>
  );
};
