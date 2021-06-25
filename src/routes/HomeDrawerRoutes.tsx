import { useNavigation } from "@react-navigation/native";
import { STRINGS } from "config";
import React, { useState, useEffect } from "react";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";
import ChatController from "ui/screens/chat/ChatController";
import ActivityLogController from "ui/screens/home/activity_log/ActivityLogController";
import AnnouncementController from "ui/screens/home/announcement/AnnouncementController";
import CommunityController from "ui/screens/home/community/CommunityController";
import FriendsRootController from "ui/screens/home/friends/FriendsRootController";
import useListenPushNotifications from "ui/screens/home/friends/useListenPushNotification";
import MatchesController from "ui/screens/home/matches/MatchesController";
import NotificationController from "ui/screens/home/notification/NotificationController";
import ProfileRootController from "ui/screens/home/profile/ProfileRootController";
import SettingsController from "ui/screens/home/settings/SettingsController";
import { AppLog } from "utils/Util";
import { HomeDrawer } from "./HomeDrawerStack";

export const HomeDrawerRoutes = () => {
  const { screenName, notificationId } = useListenPushNotifications();
  let [currentItem, setCurrentItem] = useState<string>("Matches");

  // For handling redirection through push notification
  const navigation = useNavigation();
  useEffect(() => {
    AppLog.logForcefully(
      () =>
        "navigation available: " +
        (navigation !== null && navigation !== undefined)
    );
    AppLog.logForcefully(
      () => "screenName: " + JSON.stringify(screenName)
    );

    navigation.navigate(screenName);
    setCurrentItem(screenName);
  }, [setCurrentItem, navigation, screenName, notificationId]);

  return (
    <HomeDrawer.Navigator
      initialRouteName="Matches"
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0
        }
      }}
      drawerContent={(props) => (
        <CustomDrawer
          {...props}
          currentItem={currentItem}
          setCurrentItem={setCurrentItem}
        />
      )}>
      <HomeDrawer.Screen
        name="Matches"
        component={MatchesController}
        options={{
          unmountOnBlur: true,
          headerTitle: () => <HeaderTitle text={STRINGS.matches.title} />
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
        component={CommunityController}
      />
      <HomeDrawer.Screen
        name="Announcement"
        options={{
          unmountOnBlur: true
        }}
        component={AnnouncementController}
      />
      <HomeDrawer.Screen
        name="Profile"
        component={ProfileRootController}
      />
      <HomeDrawer.Screen
        name="Friends"
        component={FriendsRootController}
      />
      <HomeDrawer.Screen name="ChatList" component={ChatController} />
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationController}
      />
      <HomeDrawer.Screen
        name="ActivityLog"
        component={ActivityLogController}
      />
      <HomeDrawer.Screen name="Settings" component={SettingsController} />
    </HomeDrawer.Navigator>
  );
};
