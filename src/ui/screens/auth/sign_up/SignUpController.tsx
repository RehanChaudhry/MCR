import { StackNavigationProp } from "@react-navigation/stack";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";
import React, { FC, useLayoutEffect, useRef } from "react";
import { Alert, Keyboard } from "react-native";
import AuthApis from "repo/auth/AuthApis";
import { AuthStackParamList } from "routes";
import { SignUpView } from "ui/screens/auth/sign_up/SignUpView";
import { useApi } from "repo/Client";
import { useNavigation } from "@react-navigation/native";
import NoHeader from "ui/components/headers/NoHeader";
import { usePreventDoubleTap } from "hooks";

type ForgotPasswordNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "SignUp"
>;

type Props = {
  navigation: ForgotPasswordNavigationProp;
};

const SignUpController: FC<Props> = () => {
  const requestModel = useRef<ForgotPasswordApiRequestModel>();
  const navigation = useNavigation<ForgotPasswordNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const forgotPasswordApi = useApi<
    ForgotPasswordApiRequestModel,
    ForgotPasswordApiResponseModel
  >(AuthApis.forgotPassword);

  const showLoginScreen = usePreventDoubleTap(() => {
    Keyboard.dismiss();
    navigation.pop();
    navigation.replace("Login");
  });

  const handleSendEmail = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }

    const {
      hasError,
      errorBody,
      dataBody
    } = await forgotPasswordApi.request([requestModel.current]);

    if (hasError || dataBody === undefined) {
      Alert.alert("Please try again", errorBody);
      return;
    } else {
      Alert.alert("User signed up successfully");
    }
  });

  return (
    <SignUpView
      sendEmailButtonCallback={(values) => {
        requestModel.current = values;
        handleSendEmail();
      }}
      shouldShowProgressBar={forgotPasswordApi.loading}
      openLoginScreen={showLoginScreen}
    />
  );
};

export default SignUpController;
