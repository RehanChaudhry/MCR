import React from "react";
import { ChatRoutes } from "routes/ChatRoutes";
import { HomeDrawer } from "routes/HomeDrawer";
import { NotificationRoutes } from "routes/NotificationRoutes";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import CommunityController from "ui/screens/home/community/CommunityController";
import FriendsController from "ui/screens/home/friends/FriendsController";
import MatchesController from "ui/screens/home/matches/MatchesController";
import ProfileController from "ui/screens/home/profile/ProfileController";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="Matches"
      drawerContent={(props) => <CustomDrawer {...props} />}>
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
      <HomeDrawer.Screen name="Friends" component={FriendsController} />
      <HomeDrawer.Screen name="ChatList" component={ChatRoutes} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationRoutes}
      />
    </HomeDrawer.Navigator>
  );
};
