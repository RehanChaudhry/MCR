import { DemoSwitchView } from "./DemoSwitchView";
import React, { FC, useLayoutEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { DemoStackParamList } from "routes/DemoStack";
import { useNavigation } from "@react-navigation/native";

type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "Switch"
>;

type Props = {};

const dataSet: Array<Object> = [
  {
    id: 1,
    isEnabled: false,
    text: "Switch inactive."
  },
  {
    id: 2,
    isEnabled: true,
    text: "Switch active."
  }
];
export const DemoSwitchController: FC<Props> = () => {
  const navigation = useNavigation<DemoNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Switch Variations"
    });
  }, [navigation]);

  return <DemoSwitchView data={dataSet} />;
};
