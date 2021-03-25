import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "routes";
import React, { FC, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import NoHeader from "ui/components/headers/NoHeader";
import { WelcomeView } from "ui/screens/home/welcome/Welcome View";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const WelcomeController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  // Add no toolbar
  useLayoutEffect(() => {
    navigation.setOptions(NoHeader.create());
  }, [navigation]);

  return <WelcomeView />;
};

export default WelcomeController;
