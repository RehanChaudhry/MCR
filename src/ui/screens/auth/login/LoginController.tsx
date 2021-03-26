import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth, usePreventDoubleTap } from "hooks";
import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
import { SignInApiResponseModel } from "models/api_responses/SignInApiResponseModel";
import React, { FC, useLayoutEffect, useRef } from "react";
import { Alert } from "react-native";
import AuthApis from "repo/auth/AuthApis";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { LoginView } from "ui/screens/auth/login/LoginView";
import { useApi } from "repo/Client";
import { AppLog } from "utils/Util";
import { WelcomeStackParamList } from "routes/WelcomeStack";

type WelcomeNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Welcome"
>;

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const LoginController: FC<Props> = () => {
  const requestModel = useRef<SignInApiRequestModel>();
  const auth = useAuth();

  const navigation = useNavigation<LoginNavigationProp>();
  const navigationWelcome = useNavigation<WelcomeNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const signInApi = useApi<SignInApiRequestModel, SignInApiResponseModel>(
    AuthApis.signIn
  );

  const openUniSelectionScreen = usePreventDoubleTap(() => {
    navigation.push("Welcome");
  });

  const openForgotPasswordScreen = usePreventDoubleTap(() => {
    navigation.navigate("ForgotPassword");
  });
  const openWelcomeScreen = usePreventDoubleTap(() => {
    navigationWelcome.navigate("Welcome");
  });

  const handleSignIn = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log("handleSignIn: ");
    const { hasError, errorBody, dataBody } = await signInApi.request([
      requestModel.current
    ]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
      await auth.logIn(dataBody);
    }
  });

  AppLog.log(handleSignIn);

  return (
    <LoginView
      shouldShowProgressBar={signInApi.loading}
      openForgotPasswordScreen={openForgotPasswordScreen}
      openWelcomeScreen={openWelcomeScreen}
      openUniSelectionScreen={openUniSelectionScreen}
    />
  );
};

export default LoginController;
