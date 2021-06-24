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

type NotificationRedirectionLiteralType = {
  [key: string]: (notification: OSNotification) => void;
};

type HandleNotificationLiteralType = {
  [key: string]: (action: string) => void;
};

const App: React.FC<Props> = () => {
  AppLog.log(() => "Rendering App...");
  const [notificationId, setNotificationId] = useState("");
  const [screenName, setScreenName] = useState("Matches");

  //Configure OneSignal
  PushNotification.init();

  const notificationUpdate: PushNotificationContext = {
    notificationId: notificationId,
    screenName: screenName,
    setNotification: (_notificationId, _screenName) => {
      setNotificationId(_notificationId);
      setScreenName(_screenName);
    }
  };

  const handleFriendsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToFriendsScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: OSNotification) =>
      navigateToFriendsScreen(notification),
    [NotificationActionType.RESPOND]: (notification: OSNotification) =>
      navigateToFriendsScreen(notification),
    default: () => {
      AppLog.logForcefully(
        () =>
          "Notification#handleFriendsRedirection()=> No matching result found"
      );
    }
  };

  const handleRoommateGroupsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.ENTER]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    [NotificationActionType.LEAVE]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    [NotificationActionType.UPDATE]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    default: () => {
      AppLog.logForcefully(
        () =>
          "Notification#handleFriendsRedirection()=> No matching result found"
      );
    }
  };

  const handleRoommatesRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    [NotificationActionType.RESPOND]: (notification: OSNotification) =>
      navigateToRoommatesScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  const handleRoommateAgreementRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.AGREE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.DISAGREE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.UPDATE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  const handleChatsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: OSNotification) =>
      navigateToChatScreen(notification),
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToChatScreen(notification),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  const handlePostsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: OSNotification) =>
      navigateToPostScreen(notification),
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

    const notificationActions: HandleNotificationLiteralType = {
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
      ) => handleRoommateAgreementRedirection[action]?.(notification),
      [NotificationAndActivityLogFilterType.ROOMMATE_GROUP]: (
        action: string
      ) => handleRoommateGroupsRedirection[action]?.(notification)
    };

    // @ts-ignore
    notificationActions[additionalData.type]?.(
      // @ts-ignore
      additionalData?.action.toString()
    );
  }

  //ConnectRequestController
  /**
   * export enum ConnectRequestType {
   * FRIEND_REQUESTS = "friend_requests",
   * ROOMMATE_REQUESTS = "roommate_requests"
   * }
   * pass this for title
   */
  function navigateToFriendsScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToFriendsScreen()"
    );
    setScreenName("Settings");
  }

  //ConnectRequestController
  /**
   * export enum ConnectRequestType {
   * FRIEND_REQUESTS = "friend_requests",
   * ROOMMATE_REQUESTS = "roommate_requests"
   * }
   * pass this for title
   */
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

  //singlePost
  function navigateToPostScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    setScreenName("Settings");
  }

  //RoommateAgreementController
  function navigateToRoommateAgreementScreen(
    notification: OSNotification
  ) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    setScreenName("Settings");
  }

  // All notifications work started from here, when user click on notification
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
