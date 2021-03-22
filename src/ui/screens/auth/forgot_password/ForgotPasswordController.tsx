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
import { useApi } from "repo/Client";
import { AppLog } from "utils/Util";
import { ForgotPasswordView } from "ui/screens/auth/forgot_password/ForgotPasswordView";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const LoginController: FC<Props> = () => {
  const requestModel = useRef<SignInApiRequestModel>();
  const auth = useAuth();

  const navigation = useNavigation<LoginNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const forgotPasswordApi = useApi<
    SignInApiRequestModel,
    SignInApiResponseModel
  >(AuthApis.signIn);

  const handleForgotPassword = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
    AppLog.log("handleSignIn: ");
    const {
      hasError,
      errorBody,
      dataBody
    } = await forgotPasswordApi.request([requestModel.current]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to Sign In", errorBody);
      return;
    } else {
      await auth.logIn(dataBody);
    }
  });

  AppLog.log(handleForgotPassword);

  return (
    <ForgotPasswordView
      shouldShowProgressBar={forgotPasswordApi.loading}
    />
  );
};

export default LoginController;
