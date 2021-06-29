// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React from "react";
import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PushNotification } from "utils/PushNotification";
import OneSignal from "react-native-onesignal";
import useNotification from "hooks/useNotification";
import { PushNotificationContext } from "hooks/usePushNotificationContextToNavigate";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log(() => "Rendering App...");

  //Configure OneSignal
  PushNotification.init();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: notificationUpdate,
    handleNotification
  } = useNotification();

  OneSignal.setNotificationOpenedHandler((data) => {
    AppLog.log(() => "OneSignal: setNotificationOpenedHandler: ", data);
    const { additionalData } = data.notification;
    handleNotification({
      action: additionalData.action,
      type: additionalData.type,
      postId: additionalData.referenceId,
      conversationId: additionalData.referenceId
    });
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
