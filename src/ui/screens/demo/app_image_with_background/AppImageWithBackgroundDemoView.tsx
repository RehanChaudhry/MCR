import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import SimpleToast from "react-native-simple-toast";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

type Props = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const AppImageWithBackgroundView: FC<Props> = (props) => {
  const onPress = () => {
    SimpleToast.show("clicked");
  };
  return (
    <ThemeSwitcher>
      <View style={style.container}>
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={require("assets/images/check.png")}
          onPress={onPress}
        />
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={require("assets/images/list.png")}
          onPress={onPress}
        />
        <AppImageBackground
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={require("assets/images/shield.png")}
          onPress={onPress}
        />
        <AppImageBackground
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={require("assets/images/plus.png")}
          onPress={onPress}
        />
        <AppImageBackground
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={require("assets/images/chat.png")}
          onPress={onPress}
        />
        <AppImageBackground
          containerShape={CONTAINER_TYPES.CIRCLE}
          icon={require("assets/images/arrow-up.png")}
          containerStyle={style.imageContainerStyle}
          iconStyle={style.iconStyle}
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
