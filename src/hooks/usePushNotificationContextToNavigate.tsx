import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { HomeStackParamList } from "routes/HomeStack";
import { AppLog } from "utils/Util";

export type PushNotificationContext = {
  screenName: keyof HomeStackParamList;
  params?: HomeStackParamList[keyof HomeStackParamList];
};

export const PushNotificationContext = React.createContext<PushNotificationContext>(
  {
    screenName: "DrawerRoutes"
  }
);

export const usePushNotificationsContextToNavigate = (
  callback: (value: PushNotificationContext) => void
) => {
  const { screenName, params } = React.useContext(PushNotificationContext);
  const navigation = useNavigation();
  useEffect(() => {
    AppLog.log(
      () =>
        "screenName: " + screenName + ", params: " + JSON.stringify(params)
    );

    navigation.navigate(screenName, params);
    callback({ screenName, params });
  }, [callback, navigation, screenName, params]);
};
