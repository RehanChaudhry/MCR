import React, {
  FC,
  useCallback,
  //useContext,
  useLayoutEffect,
  useState
} from "react";
import { UpdateProfileView } from "ui/screens/home/profile/update_profile/UpdateProfileView";
import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ProfileStackParamList } from "routes/ProfileBottomBar";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { UpdateProfileStackParamList } from "routes/ProfileStack";
import EScreen from "models/enums/EScreen";
import HeaderLeftTextWithIcon from "ui/components/molecules/header_left_text_with_icon/HeaderLeftTextWithIcon";
import LeftArrow from "assets/images/left.svg";
import { useAuth, usePreferredTheme, usePreventDoubleTap } from "hooks";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
//import { NotifyContext } from "routes/ProfileRoutes";
import WelcomeSkipTitleButton from "ui/components/molecules/welcome_skip_title_button/WelcomeSkipTitleButton";
import Api from "config/Api";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
//import AuthStorage from "repo/auth/AuthStorage";

type Props = {};
type ProfileNavigationProp = StackNavigationProp<
  ProfileStackParamList,
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
  //const { setTimeStamp } = useContext(NotifyContext);

  const auth = useAuth();

  const navigation = useNavigation<ProfileNavigationProp>();
  const welcomeNavigation = useNavigation<welcomeNavigationProp>();
  const route = useRoute<UpdateProfileRouteProp>();
  const { themedColors } = usePreferredTheme();

  //for info text shown
  const [infoTextShown, setInfoTextShown] = useState(false);

  const openQuestionnaireScreen = usePreventDoubleTap(() => {
    welcomeNavigation.navigate("Questionnaire", {
      isFrom: EScreen.WELCOME
    });
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => <Hamburger />,
      headerTitleAlign: "center",
      headerTitle: () => <HeaderTitle text="Update Profile" />
    });
    if (route.params.isFrom === EScreen.WELCOME) {
      setInfoTextShown(true);
      navigation.setOptions({
        headerTitleAlign: "center",
        headerTitle: () => <HeaderTitle text="Complete Profile" />,
        headerLeft: () => (
          <HeaderLeftTextWithIcon
            fontWeight={"semi-bold"}
            text={"Back"}
            icon={() => {
              return (
                <LeftArrow
                  width={20}
                  height={20}
                  fill={themedColors.interface["700"]}
                />
              );
            }}
            onPress={() => {
              navigation.pop();
            }}
          />
        ),
        headerRight: () => (
          <WelcomeSkipTitleButton
            onPress={openQuestionnaireScreen}
            updateProfileRequest={{
              queryParams: Api.COMPLETE_PROFILE_QUERY_PARAMS
            }}
          />
        )
      });
    }
  }, [
    navigation,
    route.params.isFrom,
    themedColors.interface,
    openQuestionnaireScreen
  ]);

  //update profile api integration
  const updateProfileApi = useApi<
    UpdateProfileRequestModel,
    UpdateProfileResponseModel
  >(AuthApis.updateProfile);

  //handle update profile api
  const handleUpdateProfile = usePreventDoubleTap(
    async (apiRequestModel: UpdateProfileRequestModel) => {
      // AppLog.log("handleSignIn: ");

      //setShouldShowPb(true);
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
        await fetchMyProfile();
      }
    }
  );

  //updating user info to show in view profile
  const updateProfileUiApi = useApi<any, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
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
      Alert.alert("Something went wrong", errorBody);
      return;
    } else {
      // //data modification for profile header
      // let modifiedItem = dataBody.data.sections?.[0]?.formInputs?.[0]!!;
      // modifiedItem.firstName = dataBody.data.sections![0].formInputs![1].userMeta![0].value;
      // modifiedItem.lastName = dataBody.data.sections![0].formInputs![2].userMeta![0].value;
      // dataBody.data.sections?.[0].formInputs?.splice(0, 3, modifiedItem);

      //updating user info
      await auth.saveUser({
        authentication: auth.user?.authentication,
        profile: dataBody.data
      });

      Alert.alert(
        "Your profile has been updated successfully.",
        dataBody.message
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProfileUiApi]);

  return (
    <>
      {useLazyLoadInterface(
        <UpdateProfileView
          openUpdateQuestionnaireScreen={openQuestionnaireScreen}
          infoTextShown={infoTextShown}
          handleUpdateProfile={(_requestModel) => {
            handleUpdateProfile(_requestModel);
          }}
          updateProfileUiData={auth.user?.profile}
          shouldShowProgressBar={updateProfileApi.loading}
        />,
        null,
        3000
      )}
    </>
  );
};

export default UpdateProfileController;
