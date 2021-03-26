import React from "react";
import AnnouncementRoutes from "routes/AnnouncementRoutes";
import { ChatRoutes } from "routes/ChatRoutes";
import CommunityRoutes from "routes/CommunityRoutes";
import { HomeDrawer } from "routes/HomeDrawer";
import MatchesRoutes from "routes/MatchesRoutes";
import { NotificationRoutes } from "routes/NotificationRoutes";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";
import FriendsController from "ui/screens/home/friends/FriendsController";
import ProfileController from "../ui/screens/home/profile/ProfileController";
import SettingsController from "../ui/screens/home/settings/SettingsController";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="Matches"
      drawerContent={(props) => <CustomDrawer {...props} />}>
      <HomeDrawer.Screen name="Matches" component={MatchesRoutes} />
      <HomeDrawer.Screen name="Community" component={CommunityRoutes} />
      <HomeDrawer.Screen
        name="Announcement"
        component={AnnouncementRoutes}
      />
      <HomeDrawer.Screen name="Profile" component={ProfileController} />
      <HomeDrawer.Screen name="Friends" component={FriendsController} />
      <HomeDrawer.Screen name="ChatList" component={ChatRoutes} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationRoutes}
      />
      <HomeDrawer.Screen name="Settings" component={SettingsController} />
    </HomeDrawer.Navigator>
  );
};
