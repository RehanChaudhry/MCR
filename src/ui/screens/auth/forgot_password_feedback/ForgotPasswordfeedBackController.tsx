import {
  RouteProp,
  useNavigation,
  useRoute
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { usePreventDoubleTap } from "hooks";
import React, { FC, useLayoutEffect } from "react";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { ForgotPasswordFeedBackView } from "ui/screens/auth/forgot_password_feedback/ForgotPasswordFeedBackView";

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

  return (
    <ForgotPasswordFeedBackView
      openForgotPasswordScreen={openForgotPasswordScreen}
      openSignInScreen={openSignInScreen}
      email={route.params.email}
    />
  );
};

export default ForgotPasswordFeedBackController;
