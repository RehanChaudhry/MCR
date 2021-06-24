import OneSignal from "react-native-onesignal";
import Env from "envs/env";

export const PushNotification = {
  init: () => {
    /* O N E S I G N A L   S E T U P */
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId(Env.ONE_SIGNAL_APP_ID);

    /**
     * Handle notification before displaying
     */
    /* OneSignal.setNotificationWillShowInForegroundHandler(
      (notifReceivedEvent) => {
        let notif = notifReceivedEvent.getNotification();
        const payload = JSON.parse(notif.rawPayload);
        payload.alert = "Title Manipulation";
        notif.body = "Title Manipulation";
        notif.title = "Title Manipulation";
        notif.rawPayload = payload;

        AppLog.log(
          () => "OneSignal: setNotificationWillShowInForegroundHandler: ",
          JSON.stringify(notif)
        );

        notifReceivedEvent.complete(notif);
        prepareNotification(notif);
      }
    );*/
    /* O N E S I G N A L   S E T U P */
  },
  registerUser: (userId: number | undefined) => {
    userId && OneSignal.sendTag("user_id", userId.toString());
  }
};
