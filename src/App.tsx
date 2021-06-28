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
  const [screenName, setScreenName] = useState("DrawerRoutes");

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

  const handleConnectRequestsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToConnectRequestScreen(notification),
    [NotificationActionType.ACCEPT]: (notification: OSNotification) =>
      navigateToConnectRequestScreen(notification),
    [NotificationActionType.RESPOND]: (notification: OSNotification) =>
      navigateToConnectRequestScreen(notification)
  };

  const handleMyRoommatesRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.ENTER]: (notification: OSNotification) =>
      navigateToMyRoommatesScreen(notification),
    [NotificationActionType.LEAVE]: (notification: OSNotification) =>
      navigateToMyRoommatesScreen(notification),
    [NotificationActionType.UPDATE]: (notification: OSNotification) =>
      navigateToMyRoommatesScreen(notification)
  };

  const handleRoommateAgreementRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.AGREE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.DISAGREE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification),
    [NotificationActionType.UPDATE]: (notification: OSNotification) =>
      navigateToRoommateAgreementScreen(notification)
  };

  const handleChatsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: OSNotification) =>
      navigateToChatScreen(notification),
    [NotificationActionType.RECIEVE]: (notification: OSNotification) =>
      navigateToChatScreen(notification)
  };

  const handlePostsRedirection: NotificationRedirectionLiteralType = {
    [NotificationActionType.CREATE]: (notification: OSNotification) =>
      navigateToPostScreen(notification),
    [NotificationActionType.LIKE]: (notification: OSNotification) =>
      navigateToPostScreen(notification),
    [NotificationActionType.COMMENT]: (notification: OSNotification) =>
      navigateToPostScreen(notification)
  };

  function handleNotification(notification: OSNotification) {
    const { additionalData } = notification;

    const notificationActions: HandleNotificationLiteralType = {
      [NotificationAndActivityLogFilterType.FRIEND_REQUEST]: (
        action: string
      ) => handleConnectRequestsRedirection[action]?.(notification),

      [NotificationAndActivityLogFilterType.ROOMMATE_REQUEST]: (
        action: string
      ) => handleConnectRequestsRedirection[action]?.(notification),

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
      ) => handleMyRoommatesRedirection[action]?.(notification)
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
  function navigateToConnectRequestScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ?? "navigateToConnectRequestsScreen()"
    );
    setScreenName("ConnectRequests");
  }

  function navigateToChatScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToChatScreen()"
    );
    setScreenName("Chat");
  }

  //singlePost
  function navigateToPostScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToPostScreen()"
    );
    setScreenName("SinglePost");
  }

  //RoommateAgreementController
  function navigateToRoommateAgreementScreen(
    notification: OSNotification
  ) {
    AppLog.logForcefully(
      () =>
        JSON.stringify(notification) ??
        "navigateToRoommateAgreementScreen()"
    );
    setScreenName("RoommateAgreement");
  }

  // MyRoommatesController
  function navigateToMyRoommatesScreen(notification: OSNotification) {
    AppLog.logForcefully(
      () => JSON.stringify(notification) ?? "navigateToMyRoommatesScreen()"
    );
    setScreenName("MyRoommates");
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
