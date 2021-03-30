import React, { FC, useState } from "react";
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
import { usePreventDoubleTap } from "hooks";

import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { NotificationParamList } from "routes/NotificationParams";
import EScreen from "models/enums/EScreen";

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "ViewProfile"
>;

type Props = {};

const NotificationController: FC<Props> = () => {
  const navigation = useNavigation<NotificationNavigationProp>();
  const notify = DataGenerator.getNotifications();

  const [notifications, setNotifications] = useState<
    Array<NotificationData>
  >(notify);

  const notificationApi = useApi<any, NotificationsResponseModel>(
    ProfileApis.getNotifications
  );

  const openMyProfileScreen = usePreventDoubleTap(() => {
    navigation.push("ViewProfile", { isFrom: EScreen.NOTIFICATION });
  });

  navigation.setOptions({
    headerLeft: () => <Hamburger />,
    headerTitleAlign: "center",
    headerStyle: { elevation: 0 },
    headerTitle: () => <HeaderTitle text="Notification" />
  });

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
      <NotificationView
        notifications={notifications}
        openMyProfileScreen={openMyProfileScreen}
      />
    </ProgressErrorView>
  );
};

export default NotificationController;
