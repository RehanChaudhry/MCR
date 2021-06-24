// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React, { useState } from "react";
import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PushNotification } from "utils/PushNotification";
import { PushNotificationContext } from "ui/screens/home/friends/useListenPushNotification";
import OneSignal, { OSNotification } from "react-native-onesignal";
import NotificationActionType from "models/enums/NotificationActionType";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log(() => "Rendering App...");
  const [notificationId, setNotificationId] = useState("");
  const [screenName, setScreenName] = useState("Matches");

  const notificationUpdate: PushNotificationContext = {
    notificationId: notificationId,
    screenName: screenName,
    setNotification: (_notificationId, _screenName) => {
      setNotificationId(_notificationId);
      setScreenName(_screenName);
    }
  };

  PushNotification.init();

  const handleFriendsRedirection: {
    [key: string]: (notification: OSNotification) => void;
  } = {
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToFriendsScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: OSNotification) =>
      navigateToFriendsScreen(notification),
    default: () => {
      AppLog.logForcefully(
        () =>
          "Notification#handleFriendsRedirection()=> No matching result found"
      );
    }
  };

  const handleRoommatesRedirection: {
    [key: string]: (notification: OSNotification) => void;
  } = {
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  const handleChatsRedirection: {
    [key: string]: (notification: OSNotification) => void;
  } = {
    [NotificationActionType.CREATE]: (notification: OSNotification) =>
      navigateToChatScreen(notification),
    [NotificationActionType.RESPOND]: (notification: OSNotification) =>
      navigateToChatScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  const handlePostsRedirection: {
    [key: string]: (notification: OSNotification) => void;
  } = {
    [NotificationActionType.LIKE]: (notification: OSNotification) =>
      navigateToPostScreen(notification),
    [NotificationActionType.COMMENT]: (notification: OSNotification) =>
      navigateToPostScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  function handleNotification(notification: OSNotification) {
    const { additionalData } = notification;
    const notificationActions: {
      [key: string]: (action: string) => void;
    } = {
      [NotificationAndActivityLogFilterType.FRIEND_REQUEST]: (
        action: string
      ) => handleFriendsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.ROOMMATE_REQUEST]: (
        action: string
      ) => handleRoommatesRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.CHAT]: (action: string) =>
        handleChatsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.CONVERSATION]: (
        action: string
      ) => handleChatsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.ANNOUNCEMENT]: (
        action: string
      ) => handlePostsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.POST]: (action: string) =>
        handlePostsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT]: (
        action: string
      ) => handleFriendsRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.ROOMMATE_GROUP]: (
        action: string
      ) => handleFriendsRedirection[action]?.(notification)
    };

    // @ts-ignore
    notificationActions[additionalData.type]?.(
      // @ts-ignore
      additionalData?.action.toString()
    );
  }

  function navigateToFriendsScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToFriendsScreen()"
    );
    setScreenName("Settings");
  }

  function navigateToRoommatesScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToRoommatesScreen()"
    );
    setScreenName("Settings");
  }

  function navigateToChatScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToChatScreen()"
    );
    setScreenName("Settings");
  }

  function navigateToPostScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    setScreenName("Settings");
  }

  OneSignal.setNotificationOpenedHandler((data) => {
    AppLog.log(() => "OneSignal: setNotificationOpenedHandler: ", data);
    const { notification } = data;
    handleNotification(notification);
  });

  return (
    <AppThemeProvider colorScheme={AppColorScheme.SYSTEM}>
      <SafeAreaProvider>
        <PushNotificationContext.Provider value={notificationUpdate}>
          <SplashView />
        </PushNotificationContext.Provider>
      </SafeAreaProvider>
    </AppThemeProvider>
  );
};
export default App;
