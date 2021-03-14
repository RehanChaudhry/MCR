import React, { FC, Props, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppProgressBarView } from "./AppProgressBarView";
import { StackNavigationProp } from "@react-navigation/stack";
import { DemoStackParamList } from "routes/DemoStack";

type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "AppProgressBar"
>;

export const AppProgressBarController: FC<Props<any>> = () => {
  const navigation = useNavigation<DemoNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Progress Bar Variations"
    });
  }, [navigation]);

  return <AppProgressBarView />;
};
