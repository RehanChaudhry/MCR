import React, { useState } from "react";
import AnnouncementRoutes from "routes/AnnouncementRoutes";
import CommunityRoutes from "routes/CommunityRoutes";
import { HomeDrawer } from "routes/HomeDrawer";
import MatchesRoutes from "routes/MatchesRoutes";
import { NotificationRoutes } from "routes/NotificationRoutes";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";
import ProfileController from "../ui/screens/home/profile/ProfileController";
import FriendsRootRoutes from "./FriendsRootRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ActivityLogRoutes from "routes/ActivityLogRoutes";
import ChatRootRoutes from "routes/ChatRootRoutes";

export const HomeRoutes = () => {
  let [currentItem, setCurrentItem] = useState<string>("Matches");

  return (
    <HomeDrawer.Navigator
      initialRouteName="Matches"
      backBehavior="initialRoute"
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          currentItem={currentItem}
          setCurrentItem={(name: string) => {
            setCurrentItem(name);
          }}
        />
      )}>
      <HomeDrawer.Screen
        name="Matches"
        component={MatchesRoutes}
        // @ts-ignore
        initialParams={{
          changeSelectedDrawerItem: () => {
            setCurrentItem("Matches");
          }
        }}
      />
      <HomeDrawer.Screen name="Community" component={CommunityRoutes} />
      <HomeDrawer.Screen
        name="Announcement"
        component={AnnouncementRoutes}
      />
      <HomeDrawer.Screen name="Profile" component={ProfileController} />
      <HomeDrawer.Screen name="Friends" component={FriendsRootRoutes} />
      <HomeDrawer.Screen name="ChatList" component={ChatRootRoutes} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationRoutes}
      />
      <HomeDrawer.Screen
        name="ActivityLog"
        component={ActivityLogRoutes}
      />
      <HomeDrawer.Screen name="Settings" component={SettingsRoutes} />
    </HomeDrawer.Navigator>
  );
};
