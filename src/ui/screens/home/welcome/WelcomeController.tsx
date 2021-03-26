import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "routes";
import React, { FC, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { WelcomeView } from "ui/screens/home/welcome/WelcomeView";

type LoginNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

type Props = {};

const WelcomeController: FC<Props> = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Notification"
    });
  }, [navigation]);

  return <WelcomeView />;
};

export default WelcomeController;
