import React, { useCallback, useEffect, useState } from "react";
import AnnouncementRoutes from "routes/AnnouncementRoutes";
import CommunityRoutes from "routes/CommunityRoutes";
import { HomeDrawer, HomeDrawerParamList } from "routes/HomeDrawerStack";
import MatchesRoutes from "routes/MatchesRoutes";
import { NotificationRoutes } from "routes/NotificationRoutes";
import { CustomDrawer } from "ui/components/templates/drawer/CustomDrawer";
import AppDataProvider from "ui/screens/home/friends/AppDataProvider";
import FriendsRootRoutes from "./FriendsRootRoutes";
import SettingsRoutes from "./SettingsRoutes";
import ActivityLogRoutes from "routes/ActivityLogRoutes";
import ChatRootRoutes from "routes/ChatRootRoutes";
import ProfileRootRoutes from "routes/ProfileRootRoutes";
import { createStackNavigator } from "@react-navigation/stack";
import useListenPushNotifications from "ui/screens/home/friends/useListenPushNotification";
import { AppLog } from "utils/Util";
import { SocketHelper } from "utils/SocketHelper";
import { useAuth } from "hooks";
import {
  NavigatorScreenParams,
  useNavigation
} from "@react-navigation/native";

export type HomeRootStackParamList = {
  Root: NavigatorScreenParams<HomeDrawerParamList>;
  Settings: NavigatorScreenParams<HomeDrawerParamList>;
};

const HomeRootStack = createStackNavigator<HomeRootStackParamList>();

export const HomeRoutes = () => {
  const auth = useAuth();

  //Connect socket
  const connectSocket = useCallback(async () => {
    await SocketHelper.getInstance(
      "Bearer " + auth.user?.authentication?.accessToken
    );
  }, [auth.user]);

  useEffect(() => {
    connectSocket()
      .then((_) => {})
      .catch();
  }, [connectSocket]);
  //Connect Socket End

  const HomeDrawerRoutes = () => {
    const { screenName, notificationId } = useListenPushNotifications();
    let [currentItem, setCurrentItem] = useState<string>("Matches");

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
    );
  };

  return (
    <AppDataProvider>
      <HomeRootStack.Navigator
        initialRouteName="Root"
        screenOptions={{ headerShown: false }}>
        <HomeRootStack.Screen name="Root" component={HomeDrawerRoutes} />
        <HomeRootStack.Screen name="Settings" component={SettingsRoutes} />
      </HomeRootStack.Navigator>
    </AppDataProvider>
  );
};
