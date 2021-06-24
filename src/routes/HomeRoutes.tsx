import React, { useState } from "react";
import AnnouncementRoutes from "routes/AnnouncementRoutes";
import CommunityRoutes from "routes/CommunityRoutes";
import { HomeDrawer } from "routes/HomeDrawerStack";
import MatchesRoutes from "routes/MatchesRoutes";
import { NotificationRoutes } from "routes/NotificationRoutes";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";
import AppDataProvider from "ui/screens/home/friends/AppDataProvider";
import FriendsRootRoutes from "./FriendsRootRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ActivityLogRoutes from "routes/ActivityLogRoutes";
import ChatRootRoutes from "routes/ChatRootRoutes";
import ProfileRootRoutes from "routes/ProfileRootRoutes";

export const HomeRoutes = () => {
  let [currentItem, setCurrentItem] = useState<string>("Matches");

  return (
    <AppDataProvider>
      <HomeDrawer.Navigator
        initialRouteName="Matches"
        backBehavior="initialRoute"
        drawerContent={(props) => (
          <CustomDrawer
            {...props}
            currentItem={currentItem}
            setCurrentItem={setCurrentItem}
          />
        )}>
        <HomeDrawer.Screen
          name="Matches"
          component={MatchesRoutes}
          options={{
            unmountOnBlur: true
          }}
          // @ts-ignore
          initialParams={{
            changeSelectedDrawerItem: () => {
              setCurrentItem("Matches");
            }
          }}
        />
        <HomeDrawer.Screen
          name="Community"
          options={{
            unmountOnBlur: true
          }}
          component={CommunityRoutes}
        />
        <HomeDrawer.Screen
          name="Announcement"
          options={{
            unmountOnBlur: true
          }}
          component={AnnouncementRoutes}
        />
        <HomeDrawer.Screen name="Profile" component={ProfileRootRoutes} />
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
    </AppDataProvider>
  );
};
