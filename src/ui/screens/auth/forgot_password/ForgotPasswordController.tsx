import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect, useRef } from "react";
import { Alert } from "react-native";
import SimpleToast from "react-native-simple-toast";
import AuthApis from "repo/auth/AuthApis";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { useApi } from "repo/Client";
import { AppLog } from "utils/Util";
import { ForgotPasswordView } from "ui/screens/auth/forgot_password/ForgotPasswordView";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import { ForgotPasswordApiResponseModel } from "models/api_responses/ForgotPasswordApiResponseModel";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const ForgotPasswordController: FC<Props> = () => {
  const requestModel = useRef<ForgotPasswordApiRequestModel>();

  const navigation = useNavigation<LoginNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  const openForgotPasswordFeedBackScreen = usePreventDoubleTap(
    (email: string) => {
      navigation.navigate("ForgotPasswordFeedBack", {
        email: email
      });
    }
  );

  const openSignInScreen = usePreventDoubleTap(() => {
    navigation.pop();
  });

  const forgotPasswordApi = useApi<
    ForgotPasswordApiRequestModel,
    ForgotPasswordApiResponseModel
  >(AuthApis.forgotPassword);

  const handleForgotPassword = usePreventDoubleTap(async () => {
    if (requestModel.current === undefined) {
      return;
    }
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
      SimpleToast.show(dataBody.message);
      openForgotPasswordFeedBackScreen(requestModel.current.email);
    }
  });

  return (
    <ForgotPasswordView
      shouldShowProgressBar={forgotPasswordApi.loading}
      openForgotPasswordFeedBackScreen={openForgotPasswordFeedBackScreen}
      openSignInScreen={openSignInScreen}
      onForgotPassword={(value) => {
        requestModel.current = {
          email: value.email
        };
        handleForgotPassword();
      }}
    />
  );
};

export default ForgotPasswordController;
