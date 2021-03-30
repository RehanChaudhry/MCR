import React, { FC, useLayoutEffect } from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import { useNavigation, useRoute } from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { RouteProp } from "@react-navigation/native";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { NotificationParamList } from "routes/NotificationParams";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ViewProfile"
>;

type ViewProfileRouteProp = RouteProp<
  NotificationParamList,
  "ViewProfile"
>;

type NotificationNavigationProp = StackNavigationProp<
  NotificationParamList,
  "Notification"
>;

type ProfileRouteProp = RouteProp<ProfileStackParamList, "ViewProfile">;

const ViewProfileController: FC<Props> = () => {
  const navigation = useNavigation<ProfileNavigationProp>();
  const navigationNotification = useNavigation<NotificationNavigationProp>();
  const route = useRoute<ViewProfileRouteProp>();

  const viewProfileRoute = useRoute<ProfileRouteProp>();

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.NOTIFICATION) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => navigationNotification.goBack()}
          />
        ),

        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="View Profile" />
      });
    } else if (viewProfileRoute.params.isFrom === EScreen.HOME) {
      navigation.setOptions({
        headerLeft: () => <Hamburger />,
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="View Profile" />
      });
    }
  }, [navigation, route.params.isFrom, viewProfileRoute.params.isFrom]);

  return <ViewProfileView />;
};

export default ViewProfileController;
