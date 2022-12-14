import React, { FC, useCallback, useEffect, useState } from "react";
import { UpdateProfileView } from "ui/screens/home/profile/update_profile/UpdateProfileView";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileBottomParamList } from "routes/ProfileBottomBar";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { UpdateProfileStackParamList } from "routes/ProfileStack";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import { useAuth, usePreventDoubleTap } from "hooks";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { Alert, BackHandler } from "react-native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import SkipTitleButton from "ui/components/molecules/skip_title_button/SkipTitleButton";
import Api from "config/Api";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import SimpleToast from "react-native-simple-toast";
import { AppLog } from "utils/Util";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileBottomParamList,
  "UpdateProfile"
>;

type UpdateProfileRouteProp = RouteProp<
  UpdateProfileStackParamList,
  "UpdateProfile"
>;
type welcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Questionnaire"
>;

const UpdateProfileController: FC<Props> = () => {
  const auth = useAuth();

  const navigation = useNavigation<ProfileNavigationProp>();
  const welcomeNavigation = useNavigation<welcomeNavigationProp>();
  const route = useRoute<UpdateProfileRouteProp>();

  //for info text shown
  const [infoTextShown, setInfoTextShown] = useState(false);

  const openQuestionnaireScreen = usePreventDoubleTap(() => {
    welcomeNavigation.navigate("Questionnaire", {
      isFrom: EScreen.WELCOME
    });
  });

  useEffect(() => {
    if (route.params.isFrom === EScreen.WELCOME) {
      const exitAppHandler = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", exitAppHandler);
      return () =>
        BackHandler.removeEventListener(
          "hardwareBackPress",
          exitAppHandler
        );
    }
  }, [route.params.isFrom]);

  useFocusEffect(
    useCallback(() => {
      if (route.params.isFrom === EScreen.WELCOME) {
        setInfoTextShown(true);
        navigation.setOptions({
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="Complete Profile" />,
          headerLeft: () => null,
          headerRight: () => (
            <SkipTitleButton
              onPress={openQuestionnaireScreen}
              updateProfileRequest={{
                queryParams: Api.COMPLETE_PROFILE_QUERY_PARAMS
              }}
            />
          )
        });
      } else if (route.params.isFrom === EScreen.MATCH_INFO) {
        setInfoTextShown(true);
        navigation.setOptions({
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="Update Profile" />,
          headerLeft: () => (
            <HeaderLeftTextWithIcon
              onPress={() => {
                navigation.pop();
              }}
            />
          )
        });
      } else {
        navigation.dangerouslyGetParent()?.setOptions({
          headerLeft: () => <Hamburger />,
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="Update Profile" />
        });
      }
    }, [navigation, route.params.isFrom, openQuestionnaireScreen])
  );

  //update profile api integration
  const updateProfileApi = useApi<
    UpdateProfileRequestModel,
    UpdateProfileResponseModel
  >(AuthApis.updateProfile);

  //handle update profile api
  const handleUpdateProfile = usePreventDoubleTap(
    async (apiRequestModel: UpdateProfileRequestModel) => {
      if (route.params.isFrom === EScreen.WELCOME) {
        apiRequestModel.queryParams = Api.COMPLETE_PROFILE_QUERY_PARAMS;
      }

      // authenticate user
      const {
        hasError,
        errorBody,
        dataBody
      } = await updateProfileApi.request([apiRequestModel]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to update your profile", errorBody);
        return;
      } else {
        await fetchUpdatedProfile();
      }
    }
  );

  const fetchProfileApi = useApi<any, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const fetchUpdatedProfile = useCallback(async () => {
    const { hasError, dataBody } = await fetchProfileApi.request([]);

    if (hasError || !auth.user || !dataBody?.data) {
      SimpleToast.show(
        "Please try again later \n" + fetchProfileApi.error,
        SimpleToast.SHORT
      );
    } else {
      await auth.saveProfile(dataBody.data, auth.user);

      SimpleToast.show("Your profile has been updated successfully");
      if (route.params.isFrom === EScreen.WELCOME) {
        openQuestionnaireScreen();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProfileApi]);

  AppLog.logForcefully(
    () => "UpdateProfile: " + JSON.stringify(auth.user?.profile)
  );

  return (
    <>
      {useLazyLoadInterface(
        <UpdateProfileView
          infoTextShown={infoTextShown}
          handleUpdateProfile={handleUpdateProfile}
          updateProfileUiData={auth.user?.profile}
          shouldShowProgressBar={updateProfileApi.loading}
        />,
        null,
        1000
      )}
    </>
  );
};

export default UpdateProfileController;
