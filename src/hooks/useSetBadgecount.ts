import { Platform } from "react-native";
import {
  getBadgeCountSync,
  setBadgeCount
} from "react-native-notification-badge";
import { AppLog } from "utils/Util";

export default () => {
  const updateBadgeCount = (notificationCount: number | undefined) => {
    AppLog.log(() => "Notification count : " + notificationCount);

    if (Platform.OS === "android") {
      import("react-native-app-badge").then((ShortcutBadge) => {
        ShortcutBadge.default.setCount(notificationCount ?? 0);
      });
    } else {
      setBadgeCount(notificationCount ?? getBadgeCountSync())
        .then()
        .catch();
    }
  };

  return { updateBadgeCount };
};
