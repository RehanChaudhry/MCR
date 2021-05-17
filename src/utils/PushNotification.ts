import { AppLog } from "utils/Util";
import OneSignal from "react-native-onesignal";
import Env from "envs/env";

export const PushNotification = {
  init: (userId: number | undefined) => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Env.ONE_SIGNAL_APP_ID);

    OneSignal.setNotificationOpenedHandler((notification) => {
      AppLog.log("OneSignal: notification opened: ", notification);
    });

    userId !== undefined &&
      OneSignal.setExternalUserId(userId.toString(), (results) => {
        AppLog.log(
          "OneSignal: device subscribed: ",
          JSON.stringify(results)
        );
      });

    userId !== undefined &&
      OneSignal.addTrigger("user_id", userId.toString());

    userId !== undefined &&
      OneSignal.sendTag("user_id", userId.toString());

    /* O N E S I G N A L   S E T U P */
  }
};
