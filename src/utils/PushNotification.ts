import { AppLog } from "utils/Util";
import OneSignal from "react-native-onesignal";
import Env from "envs/env";

export const PushNotification = {
  init: () => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Env.ONE_SIGNAL_APP_ID);

    OneSignal.setNotificationOpenedHandler((notification) => {
      AppLog.log(
        () => "OneSignal: setNotificationOpenedHandler: ",
        notification
      );
    });

    OneSignal.setNotificationWillShowInForegroundHandler(
      (notification) => {
        AppLog.log(
          () => "OneSignal: setNotificationWillShowInForegroundHandler: ",
          notification
        );
      }
    );

    /* O N E S I G N A L   S E T U P */
  },
  registerUser: (userId: number | undefined) => {
    userId !== undefined &&
      OneSignal.sendTag("user_id", userId.toString());
  }
};
