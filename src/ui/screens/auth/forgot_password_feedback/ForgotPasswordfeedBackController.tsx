import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { ForgotPasswordFeedBackView } from "ui/screens/auth/forgot_password_feedback/ForgotPasswordFeedBackView";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const ForgotPasswordFeedBackController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  return <ForgotPasswordFeedBackView />;
};

export default ForgotPasswordFeedBackController;
