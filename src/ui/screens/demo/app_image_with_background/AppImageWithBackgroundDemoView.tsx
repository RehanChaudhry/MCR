import ArrowLeft from "assets/images/arrow_left.svg";
import PaperAirplane from "assets/images/paper_airplane.svg";
import Plus from "assets/images/plus.svg";
import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import { Color, NumberProp } from "react-native-svg";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { SvgProp } from "utils/Util";

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppImageWithBackgroundView: FC<Props> = (props) => {
  const onPress = () => {
    SimpleToast.show("clicked");
  };

  const icon1: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return (
      <PaperAirplane
        testID="icon"
        width={width}
        height={height}
        fill={color}
      />
    );
  };
  const icon2: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    return (
      <Plus testID="icon" width={width} height={height} fill={color} />
    );
  };
  const icon3: SvgProp = (color?: Color) => {
    return <ArrowLeft testID="icon" width={25} height={25} fill={color} />;
  };
  return (
    <ThemeSwitcher>
      <View style={style.container}>
        <AppImageBackground
          icon={icon1}
          containerShape={CONTAINER_TYPES.SQUARE}
          onPress={onPress}
        />
        <AppImageBackground
          icon={icon2}
          containerShape={CONTAINER_TYPES.SQUARE}
        />
        <AppImageBackground
          icon={icon3}
          containerShape={CONTAINER_TYPES.CIRCLE}
        />
      </View>
    </ThemeSwitcher>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    alignItems: "center"
  },
  imageContainerStyle: {
    width: 25,
    height: 25
  },
  iconStyle: {
    width: 15,
    height: 15
  }
});
