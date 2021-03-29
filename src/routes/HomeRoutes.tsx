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
import SettingsRoutes from "./SettingsRoutes";
import { createStackNavigator } from "@react-navigation/stack";

export const HomeRoutes = () => {
  const Stack = createStackNavigator();

  const Drawer = () => (
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
      <HomeDrawer.Screen name="Settings" component={SettingsRoutes} />
    </HomeDrawer.Navigator>
  );

  return (
    <Stack.Navigator
      initialRouteName="ShowDrawer"
      screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ShowDrawer"
        component={({}) => {
          return <Drawer />;
        }}
      />
    </Stack.Navigator>
  );
};
