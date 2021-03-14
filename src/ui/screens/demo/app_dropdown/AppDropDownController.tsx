import { StackNavigationProp } from "@react-navigation/stack";
import { DemoStackParamList } from "routes/DemoStack";
import React, { FC, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { AppDropDownView } from "./AppDropDownView";

type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "DropDown"
>;

type Props = {};

export const AppDropDownController: FC<Props> = () => {
  const navigation = useNavigation<DemoNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Dropdown Variations"
    });
  }, [navigation]);

  return <AppDropDownView />;
};
