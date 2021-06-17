import { NotificationsCountApiRequestModel } from "models/api_requests/NotificationsCountApiRequestModel";
import { NotificationsCountApiResponseModel } from "models/api_responses/NotificationsCountApiResponseModel";
import { useCallback, useContext, useEffect } from "react";
import { useApi } from "repo/Client";
import OtherApis from "repo/home/OtherApis";
import { AppLog } from "utils/Util";
import { AppDataContext } from "./AppDataProvider";

export default () => {
  const { notificationsCount, setNotificationsCount } = useContext(
    AppDataContext
  );

  const getNotificationsCountApi = useApi<
    NotificationsCountApiRequestModel,
    NotificationsCountApiResponseModel
  >(OtherApis.notificationCount);

  const fetchLatestNotificationCount = useCallback(async () => {
    const { hasError, dataBody } = await getNotificationsCountApi.request([
      {}
    ]);

    if (hasError || dataBody === undefined) {
      return;
    } else {
      AppLog.logForcefully(
        () => "Setting Notification Count To: " + dataBody.count
      );
      setNotificationsCount?.(dataBody.count);
      return dataBody.count;
    }
  }, [setNotificationsCount, getNotificationsCountApi]);

  useEffect(() => {
    fetchLatestNotificationCount();
  }, [fetchLatestNotificationCount]);

  return {
    notificationsCount,
    fetchLatestNotificationCount
  };
};
