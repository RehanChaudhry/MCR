import React, { FC, useLayoutEffect, useState } from "react";
import { NotificationView } from "ui/screens/home/notification/NotificationView";
import DataGenerator from "utils/DataGenerator";
import { useApi } from "repo/Client";
import ProfileApis from "repo/auth/ProfileApis";
import {
  NotificationData,
  NotificationsResponseModel
} from "models/api_responses/NotificationsResponseModel";
import { AppLog } from "utils/Util";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { NotificationParamList } from "routes/NotificationParams";

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "Notification"
>;
type Props = {};

const NotificationController: FC<Props> = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const notify = DataGenerator.getNotifications();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Notification"
    });
  }, [navigation]);

  const [notifications, setNotifications] = useState<
    Array<NotificationData>
  >(notify);

  const notificationApi = useApi<any, NotificationsResponseModel>(
    ProfileApis.getNotifications
  );

  const handleGetNotificationApi = async (onComplete?: () => void) => {
    const {
      hasError,
      dataBody,
      errorBody
    } = await notificationApi.request([]);
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find questions " + errorBody);
      return;
    } else {
      setNotifications([dataBody.data]);
      onComplete?.();
    }
  };

  AppLog.log(handleGetNotificationApi);
  AppLog.log(notifications);

  return (
    <ProgressErrorView
      isLoading={notificationApi.loading}
      error={notificationApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}
      data={notifications}>
      <NotificationView notifications={notifications} />
    </ProgressErrorView>
  );
};

export default NotificationController;
