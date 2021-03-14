import React, { FC, useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DemoStackParamList } from "routes/DemoStack";
import { RangeSliderView } from "./RangeSliderView";

type DemoNavigationProp = StackNavigationProp<
  DemoStackParamList,
  "RangeSlider"
>;

type Props = {};

export const RangeSliderController: FC<Props> = () => {
  const navigation = useNavigation<DemoNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Range Slider Variations"
    });
  }, [navigation]);

  return <RangeSliderView />;
};
