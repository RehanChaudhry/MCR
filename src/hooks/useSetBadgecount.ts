import { Platform } from "react-native";
import {
  getBadgeCountSync,
  setBadgeCount
} from "react-native-notification-badge";
import { AppLog } from "utils/Util";

export default () => {
  const updateBadgeCount = (notificationCount: number | undefined) => {
    AppLog.logForcefully(
      () => "Notification count : " + notificationCount
    );

    if (Platform.OS === "android") {
      import("react-native-app-badge").then((ShortcutBadge) => {
        ShortcutBadge.default.setCount(notificationCount ?? 0);
      });
    } else {
      notificationCount === undefined &&
        setBadgeCount(getBadgeCountSync());

      notificationCount !== undefined &&
        setBadgeCount(notificationCount).then().catch();
    }
  };

  return { updateBadgeCount };
};
