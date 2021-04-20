import { useNavigation } from "@react-navigation/native";
import {
  StackNavigationProp,
  StackScreenProps
} from "@react-navigation/stack";
import React, { FC, useLayoutEffect } from "react";
import { AuthStackParamList } from "routes";
import NoHeader from "ui/components/headers/NoHeader";
import { PreSSOLoginView } from "ui/screens/auth/pre_sso_login/PreSSOLoginView";
import { usePreventDoubleTap } from "hooks";
import { WelcomeStackParamList } from "routes/WelcomeStack";

type Props = {};

export type PreSSOScreenAuthStackScreenProps = StackScreenProps<
  AuthStackParamList,
  "SSO_Login"
>;

type PreSSOScreenWelcomeStackNavigationProp = StackNavigationProp<
  WelcomeStackParamList,
  "Welcome"
>;

const PreSSOLoginController: FC<Props> = () => {
  const navigation = useNavigation<
    PreSSOScreenAuthStackScreenProps["navigation"]
  >();
  const navigationWelcome = useNavigation<PreSSOScreenWelcomeStackNavigationProp>();

  const goBack = usePreventDoubleTap(() => {
    navigation.goBack();
  });

  const openWelcomeScreen = usePreventDoubleTap(() => {
    navigationWelcome.reset({
      index: 0,
      routes: [{ name: "Welcome" }]
    });
  });

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  return (
    <PreSSOLoginView
      goBack={goBack}
      openWelcomeScreen={openWelcomeScreen}
    />
  );
};

export default PreSSOLoginController;
