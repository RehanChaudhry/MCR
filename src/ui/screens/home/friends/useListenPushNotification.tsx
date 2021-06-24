import React, { useState } from "react";

type PushNotificationContext = {
  screenName: string;
  notificationId: string;
  setNotification?: (screenName: string, notificationId: string) => void;
};

const PushNotificationContext = React.createContext<PushNotificationContext>(
  {
    screenName: "",
    notificationId: ""
  }
);

export const AppPushNotificationsProvider = (props: any) => {
  const [notificationId, setNotificationId] = useState("");
  const [screenName, setScreenName] = useState("");

  const data: PushNotificationContext = {
    notificationId: notificationId,
    screenName: screenName,
    setNotification: (_notificationId, _screenName) => {
      setNotificationId(_notificationId);
      setScreenName(_screenName);
    }
  };

  return (
    <PushNotificationContext.Provider value={data}>
      {props.children}
    </PushNotificationContext.Provider>
  );
};

const useListenPushNotifications = () =>
  React.useContext(PushNotificationContext);

export default useListenPushNotifications;
