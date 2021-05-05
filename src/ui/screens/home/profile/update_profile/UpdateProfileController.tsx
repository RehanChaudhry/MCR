import React, { FC, useLayoutEffect, useState } from "react";
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
import { AppLog } from "utils/Util";
import { Alert } from "react-native";
import { useApi } from "repo/Client";
import AuthApis from "repo/auth/AuthApis";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import { UpdateProfileResponseModel } from "models/api_responses/UpdateProfileResponseModel";
import SimpleToast from "react-native-simple-toast";

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
  const navigation = useNavigation<ProfileNavigationProp>();
  const welcomeNavigation = useNavigation<welcomeNavigationProp>();
  const route = useRoute<UpdateProfileRouteProp>();
  const { themedColors } = usePreferredTheme();

  const routeName = useRoute<UpdateProfileRouteProp>();

  //for info text shown

  const [infoTextShown, setInfoTextShown] = useState(false);

  //update profile api integration

  const updateProfileApi = useApi<
    UpdateProfileRequestModel,
    UpdateProfileResponseModel
  >(AuthApis.updateProfile);

  AppLog.log("data" + routeName.params.options);

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

  const handleUpdateProfile = usePreventDoubleTap(
    async (apiRequestModel: UpdateProfileRequestModel) => {
      AppLog.log("handleSignIn: ");

      //setShouldShowPb(true);

      // authenticate user
      const {
        hasError,
        errorBody,
        dataBody
      } = await updateProfileApi.request([apiRequestModel]);

      if (hasError || dataBody === undefined) {
        Alert.alert("Unable to Sign In", errorBody);
        return;
      } else {
        SimpleToast.show(dataBody.message);
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
            (_requestModel.id = 1), handleUpdateProfile(_requestModel);
          }}
        />
      )}
    </>
  );
};

export default UpdateProfileController;
