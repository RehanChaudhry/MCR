import React from "react";

export type PushNotificationContext = {
  screenName: string;
  notificationId: string;
  setNotification?: (screenName: string, notificationId: string) => void;
};

export const PushNotificationContext = React.createContext<PushNotificationContext>(
  {
    screenName: "",
    notificationId: ""
  }
);

const useListenPushNotifications = () =>
  React.useContext(PushNotificationContext);

export default useListenPushNotifications;
