import Strings from "config/Strings";
import { NotificationReadApiRequestModel } from "models/api_requests/NotificationReadApiRequestModel";
import { useCallback } from "react";
import SimpleToast from "react-native-simple-toast";
import ProfileApis from "repo/auth/ProfileApis";
import { useApi } from "repo/Client";
import useNotificationsCount from "ui/screens/home/friends/useNotificationsCount";
import { AppLog } from "utils/Util";

export default (
  onSuccess?: (
    allRead?: boolean,
    notificationId?: number | undefined
  ) => void
) => {
  const notificationReadApi = useApi<NotificationReadApiRequestModel, any>(
    ProfileApis.notificationMarkRead
  );

  const {
    notificationsCount,
    setNotificationsCount
  } = useNotificationsCount();

  const handleNotificationMarkRead = useCallback(
    async (allRead?: boolean, notificationId?: number) => {
      AppLog.log(() => "readnotificationApifunctioncall" + notificationId);

      const {
        hasError,
        errorBody,
        dataBody
      } = await notificationReadApi.request([
        {
          all: allRead ?? false,
          notificationId: notificationId!
        }
      ]);

      if (hasError) {
        AppLog.log(() => "Unable to read notification: " + errorBody);
        SimpleToast.show(errorBody ?? Strings.something_went_wrong);
        return;
      } else {
        if (allRead) {
          SimpleToast.show(dataBody?.message);
          setNotificationsCount!(0);
        } else {
          if (notificationsCount! > 0) {
            setNotificationsCount!(notificationsCount! - 1);
          }
        }
        onSuccess?.(allRead, notificationId);
      }
    },
    [
      notificationReadApi,
      onSuccess,
      setNotificationsCount,
      notificationsCount
    ]
  );

  return {
    handleNotificationMarkRead
  };
};
