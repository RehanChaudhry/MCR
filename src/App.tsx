// prettier-ignore
import "react-native-gesture-handler";
import { AppColorScheme, AppThemeProvider } from "hooks/theme";
import React from "react";
import { SplashView } from "ui/screens/auth/splash/SplashView";
import { AppLog } from "utils/Util";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PushNotification } from "utils/PushNotification";
import useNotification from "hooks/useNotification";
import { PushNotificationContext } from "hooks/usePushNotificationContextToNavigate";
import useNotificationMarkRead from "hooks/useNotificationMarkRead";

type Props = {};

const App: React.FC<Props> = () => {
  AppLog.log(() => "Rendering App...");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    data: notificationUpdate,
    handleNotification
  } = useNotification();
  //Configure OneSignal

  const { handleNotificationMarkRead } = useNotificationMarkRead();

  PushNotification.init((data) => {
    AppLog.logForcefully(
      () => "OneSignal: setNotificationOpenedHandler: ",
      data
    );

    const { additionalData } = data.notification;
    const _additionalData: any = additionalData;

    //mark notification as read, when notification id is coming in payload
    handleNotificationMarkRead(false, _additionalData.notificationId);

    handleNotification({
      action: _additionalData.action,
      type: _additionalData.type,
      postId: _additionalData.referenceId,
      conversationId: _additionalData.referenceId
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
