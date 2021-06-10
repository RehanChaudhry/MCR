import React, { FC, useEffect, useLayoutEffect, useState } from "react";
import { ViewProfileView } from "ui/screens/home/profile/view_profile/ViewProfileView";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { NotificationParamList } from "routes/NotificationParams";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { ProfileRootStackParamList } from "routes/ProfileRootStack";
import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import { useAuth } from "hooks";
type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
  "ViewProfile"
>;

type ViewProfileNavigationProp = StackNavigationProp<
  ProfileRootStackParamList,
  "RoommateAgreement"
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
  const auth = useAuth();
  const [viewProfileUiData, setViewProfileUiData] = useState<Profile>();

  //view  profile UI integration and modification in data for profile header
  useEffect(() => {
    //data modification for profile header
    let modifiedItem = auth.user?.profile?.sections?.[0]
      ?.formInputs?.[0]!!;
    modifiedItem.firstName =
      auth.user?.profile?.sections![0].formInputs![1].userMeta?.length ===
      0
        ? "N/A"
        : auth.user?.profile?.sections![0].formInputs![1].userMeta![0]
            .value;
    modifiedItem.lastName =
      auth.user?.profile?.sections![0].formInputs![2].userMeta?.length ===
      0
        ? "N/A"
        : auth.user?.profile?.sections![0].formInputs![2].userMeta![0]
            .value;
    auth.user?.profile?.sections?.[0].formInputs?.splice(
      0,
      3,
      modifiedItem
    );

    setViewProfileUiData(auth.user?.profile);
  }, [auth.user]);

  const navigation = useNavigation<ProfileNavigationProp>();
  const navigationViewProfile = useNavigation<ViewProfileNavigationProp>();
  const navigationNotification = useNavigation<NotificationNavigationProp>();
  const route = useRoute<ViewProfileRouteProp>();

  const viewProfileRoute = useRoute<ProfileRouteProp>();

  const openRoommateAgreementScreen = () => {
    navigationViewProfile.navigate("RoommateAgreement", {
      isFrom: EScreen.MY_PROFILE
    });
  };

  useLayoutEffect(() => {
    if (route.params.isFrom === EScreen.NOTIFICATION) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => navigationNotification.goBack()}
          />
        ),

        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="My Profile" />
      });
    } else if (viewProfileRoute.params.isFrom === EScreen.HOME) {
      navigation.setOptions({
        headerLeft: () => <Hamburger />,
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="My Profile" />
      });
    } else if (route.params.isFrom === EScreen.MY_FRIENDS) {
      navigation.setOptions({
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            onPress={() => navigationNotification.goBack()}
          />
        ),

        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Profile" />
      });
    }
  }, [
    navigation,
    route.params.isFrom,
    viewProfileRoute.params.isFrom,
    navigationNotification
  ]);

  return (
    <>
      {useLazyLoadInterface(
        <ViewProfileView
          openRoommateAgreementScreen={openRoommateAgreementScreen}
          viewProfileUiData={viewProfileUiData}
        />
      )}
    </>
  );
};

export default ViewProfileController;
