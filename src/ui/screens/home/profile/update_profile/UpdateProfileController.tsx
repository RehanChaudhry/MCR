import React, {
  FC,
  useCallback,
  useContext,
  useEffect,
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
import RightArrow from "assets/images/right.svg";
import LeftArrow from "assets/images/left.svg";
import HeaderRightTextWithIcon from "ui/components/molecules/header_right_text_with_icon/HeaderRightTextWithIcon";
import { usePreferredTheme, usePreventDoubleTap } from "hooks";
import { WelcomeStackParamList } from "routes/WelcomeStack";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import {
  ProfileData,
  UpdateProfileUiResponseModel
} from "models/api_responses/UpdateProfileUiResponseModel";
import { UpdateProfileUiRequestModel } from "models/api_requests/UpdateProfileUiRequestModel";
import { NotifyContext } from "routes/ProfileRoutes";

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
  const { setTimeStamp } = useContext(NotifyContext);

  const navigation = useNavigation<ProfileNavigationProp>();
  const welcomeNavigation = useNavigation<welcomeNavigationProp>();
  const route = useRoute<UpdateProfileRouteProp>();
  const { themedColors } = usePreferredTheme();

  //for info text shown

  const [infoTextShown, setInfoTextShown] = useState(false);

  //for update profile Ui

  const [
    updateProfileUiData,
    setUpdateProfileUiData
  ] = useState<ProfileData>();

  //update profile UI integration

  const updateProfileUiApi = useApi<any, UpdateProfileUiResponseModel>(
    AuthApis.getUpdateProfileUI
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
      Alert.alert("Unable to fetch update profile ui", errorBody);
      return;
    } else {
      setUpdateProfileUiData(dataBody.data);
    }
  }, [updateProfileUiApi]);

  //update profile api integration
  const updateProfileApi = useApi<
    UpdateProfileUiRequestModel,
    UpdateProfileResponseModel
  >(AuthApis.updateProfile);

  useEffect(() => {
    fetchMyProfile();
  }, [fetchMyProfile]);

  //AppLog.log("data" + routeName.params.options);

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
          <HeaderRightTextWithIcon
            text="Skip"
            textStyle={{ color: themedColors.interface["700"] }}
            icon={() => {
              return (
                <RightArrow
                  width={20}
                  height={20}
                  fill={themedColors.interface["700"]}
                />
              );
            }}
            onPress={openQuestionnaireScreen}
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

  //handle update profile api
  const handleUpdateProfile = usePreventDoubleTap(
    async (apiRequestModel: UpdateProfileUiRequestModel) => {
      // AppLog.log("handleSignIn: ");

      //setShouldShowPb(true);

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
        Alert.alert(
          "Your profile has been updated successfully.",
          dataBody.message
        );
        const newTimeStamp = new Date().getTime();
        setTimeStamp(newTimeStamp);
      }
    }
  );

  return (
    <>
      {useLazyLoadInterface(
        <UpdateProfileView
          openUpdateQuestionnaireScreen={openQuestionnaireScreen}
          infoTextShown={infoTextShown}
          handleUpdateProfile={(_requestModel) => {
            handleUpdateProfile(_requestModel);
          }}
          updateProfileUiData={updateProfileUiData}
          shouldShowProgressBar={updateProfileApi.loading}
        />,
        null,
        3000
      )}
    </>
  );
};

export default UpdateProfileController;
