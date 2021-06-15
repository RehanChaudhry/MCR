import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";
import React, { FC, useLayoutEffect, useRef } from "react";
import { Alert } from "react-native";
import AuthApis from "repo/auth/AuthApis";
import { useApi } from "repo/Client";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { ForgotPasswordFeedBackView } from "ui/screens/auth/forgot_password_feedback/ForgotPasswordFeedBackView";
import { AppLog } from "utils/Util";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type ForgotPasswordfeedBackRoute = RouteProp<
  AuthStackParamList,
  "ForgotPasswordFeedBack"
>;

type Props = {};

const ForgotPasswordFeedBackController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();
  const route = useRoute<ForgotPasswordfeedBackRoute>();
  const requestModel = useRef<ForgotPasswordApiRequestModel>({
    email: route.params.email
  });

  AppLog.logForcefully(() => route.params.email);

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const openForgotPasswordScreen = usePreventDoubleTap(() => {
    navigation.pop();
  });
  const openSignInScreen = usePreventDoubleTap(() => {
    navigation.navigate("Login");
  });

  const forgotPasswordApi = useApi<
    ForgotPasswordApiRequestModel,
    ForgotPasswordApiResponseModel
  >(AuthApis.forgotPassword);

  const handleForgotPassword = usePreventDoubleTap(async () => {
    AppLog.log(() => "handle forgot password: ");
    const {
      hasError,
      errorBody,
      dataBody
    } = await forgotPasswordApi.request([requestModel.current]);
    if (hasError || dataBody === undefined) {
      Alert.alert("Unable to forgot password", errorBody);
      return;
    } else {
      // await auth.logIn(dataBody.data);
    }
  });

  return (
    <ForgotPasswordFeedBackView
      openForgotPasswordScreen={openForgotPasswordScreen}
      openSignInScreen={openSignInScreen}
      email={route.params.email}
      onClickedOnTryAgain={() => {
        AppLog.logForcefully(() => "dxnckn");
        handleForgotPassword();
      }}
      shouldShowProgressBar={forgotPasswordApi.loading}
    />
  );
};

export default ForgotPasswordFeedBackController;
