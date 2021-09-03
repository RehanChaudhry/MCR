import { useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
import { FetchMyProfileResponseModel } from "models/api_responses/FetchMyProfileResponseModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import React, { FC, useLayoutEffect } from "react";
import { Alert } from "react-native";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { LoginView } from "ui/screens/auth/login/LoginView";
import { AppLog } from "utils/Util";
import SimpleToast from "react-native-simple-toast";
import { STRINGS } from "config";

export type LoginScreenAuthStackScreenProps = StackScreenProps<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const LoginController: FC<Props> = () => {
  const auth = useAuth();

  const navigation = useNavigation<
    LoginScreenAuthStackScreenProps["navigation"]
  >();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const signInApi = useApi<SignInApiRequestModel, SignInApiResponseModel>(
    AuthApis.signIn
  );

  const fetchProfileApi = useApi<string, FetchMyProfileResponseModel>(
    AuthApis.fetchMyProfile
  );

  const openUniSelectionScreen = usePreventDoubleTap(() => {
    navigation.goBack();
  });

  const openContactUsScreen = usePreventDoubleTap(() => {
    navigation.navigate("ContactUs");
  });

  const openForgotPasswordScreen = usePreventDoubleTap(() => {
    navigation.navigate("ForgotPassword");
  });

  const handleSignIn = usePreventDoubleTap(
    async (apiRequestModel: SignInApiRequestModel) => {
      AppLog.log(() => "handleSignIn: ");

      // authenticate user
      const { hasError } = await signInApi.request([apiRequestModel]);

      if (hasError) {
        SimpleToast.show(
          signInApi.error ?? STRINGS.common.some_thing_bad_happened
        );
        return;
      }

      // fetch user profile dataP
      const { hasError: hasErrorProfile } = await fetchProfileApi.request([
        signInApi.data?.data?.accessToken ?? ""
      ]);

      if (hasErrorProfile) {
        Alert.alert(
          "Unable to Sign In",
          "Couldn't fetch user information.\n" + fetchProfileApi.error
        );
      } else {
        await auth.saveUser({
          authentication: signInApi.data?.data,
          profile: fetchProfileApi.data?.data
        });
      }
    }
  );

  return (
    <LoginView
      shouldShowProgressBar={signInApi.loading || fetchProfileApi.loading}
      openForgotPasswordScreen={openForgotPasswordScreen}
      onLogin={(_requestModel) => {
        handleSignIn(_requestModel);
      }}
      openUniSelectionScreen={openUniSelectionScreen}
      openContactUsScreen={openContactUsScreen}
    />
  );
};

export default LoginController;
