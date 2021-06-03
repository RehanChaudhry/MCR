import React, {
  FC,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState
} from "react";
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
import {
  ProfileData,
  UpdateProfileUiResponseModel
} from "models/api_responses/UpdateProfileUiResponseModel";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { Alert } from "react-native";

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
  const [
    viewProfileUiData,
    setViewProfileUiData
  ] = useState<ProfileData>();

  //update profile UI integration

  const updateProfileUiApi = useApi<any, UpdateProfileUiResponseModel>(
    AuthApis.updateProfileUi
  );

  //handle update profile ui api
  const fetchMyProfile = useCallback(async () => {
    //setShouldShowPb(true);

    // authenticate user
    const {
      hasError,
      errorBody,
      dataBody
    } = await updateProfileUiApi.request([]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to fetch view profile ui", errorBody);
      return;
    } else {
      //data modification for profile header
      let modifiedItem = dataBody.data.sections?.[0]?.formInputs?.[0]!!;
      modifiedItem.firstName = dataBody.data.sections![0].formInputs![1].userMeta![0].value;
      modifiedItem.lastName = dataBody.data.sections![0].formInputs![2].userMeta![0].value;
      dataBody.data.sections?.[0].formInputs?.splice(0, 3, modifiedItem);

      setViewProfileUiData(dataBody.data);
    }
  }, [updateProfileUiApi]);

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

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
