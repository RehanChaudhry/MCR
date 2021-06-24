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
  const [screenName, setScreenName] = useState("");

  const notificationUpdate: PushNotificationContext = {
    notificationId: notificationId,
    screenName: screenName,
    setNotification: (_notificationId, _screenName) => {
      setNotificationId(_notificationId);
      setScreenName(_screenName);
    }
  };

  PushNotification.init();

  const createNotification = {
    [NotificationActionType.RECIEVE]: () =>
      sentNotification("receive roommate request"),
    [NotificationActionType.ACCEPT]: () => sentNotification(),
    [NotificationActionType.LIKE]: () => sentNotification(),
    [NotificationActionType.COMMENT]: () => sentNotification(),
    [NotificationActionType.CREATE]: () => sentNotification(),
    [NotificationActionType.RESPOND]: () => sentNotification(),
    [NotificationActionType.ENTER]: () => sentNotification(),
    [NotificationActionType.LEAVE]: () => sentNotification(),
    [NotificationActionType.UPDATE]: () => sentNotification(),
    [NotificationActionType.AGREE]: () => sentNotification(),
    [NotificationActionType.DISAGREE]: () => sentNotification(),
    default: () => {
      AppLog.logForcefully(() => "default");
    }
  };

  function prepareNotification(notification: OSNotification) {
    const { additionalData } = notification;
    const handleNotification = {
      [NotificationAndActivityLogFilterType.FRIEND_REQUEST]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.ROOMMATE_REQUEST]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.CHAT]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.ANNOUNCEMENT]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.CONVERSATION]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.POST]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.(),
      [NotificationAndActivityLogFilterType.ROOMMATE_GROUP]: (
        action: string // @ts-ignore
      ) => createNotification[action]?.()
    };
    // @ts-ignore
    handleNotification[additionalData.type]?.(
      additionalData?.action.toString()
    );
  }

  function sentNotification(text?: string) {
    AppLog.logForcefully(() => text ?? "sentNotification()");
    setScreenName(text ?? "");
  }

  OneSignal.setNotificationOpenedHandler((data) => {
    AppLog.log(() => "OneSignal: setNotificationOpenedHandler: ", data);
    const { notification } = data;
    prepareNotification(notification);
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
