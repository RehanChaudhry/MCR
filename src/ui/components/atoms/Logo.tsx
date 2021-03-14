import React from "react";
import { StyleSheet, Image } from "react-native";
import { moderateScale } from "config/Dimens";

interface OwnProps {}

type Props = OwnProps;

export const Logo = React.memo<Props>(() => {
  return (
    <Image
      style={styles.logoImage}
      resizeMode="stretch"
      source={require("assets/images/watermark_logo.png")}
    />
  );
});

const styles = StyleSheet.create({
  logoImage: {
    height: moderateScale(45),
    aspectRatio: 4.6,
    alignSelf: "center"
  }
});
