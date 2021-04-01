import React from "react";
import { StyleSheet, Image } from "react-native";
import { moderateScale } from "config/Dimens";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

export const Logo = optimizedMemo<Props>(() => {
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
