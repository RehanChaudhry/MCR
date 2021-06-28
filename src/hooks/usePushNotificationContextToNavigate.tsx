import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { AppLog } from "utils/Util";

export type PushNotificationContext = {
  screenName: string;
};

export const PushNotificationContext = React.createContext<PushNotificationContext>(
  {
    screenName: ""
  }
);

export const usePushNotificationsContextToNavigate = (
  callback: (screenName: string) => void
) => {
  const { screenName } = React.useContext(PushNotificationContext);
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
    callback(screenName);
  }, [callback, navigation, screenName]);
};
