import { moderateScale, SPACE } from "config/Dimens";
import { useAuth } from "hooks";
import React from "react";
import { Image, ImageStyle, StyleProp, StyleSheet } from "react-native";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  shouldNotOptimize?: boolean;
  style?: StyleProp<ImageStyle>;
}

type Props = OwnProps;

export const UniLogo = optimizedMemo<Props>(({ style }) => {
  const auth = useAuth();

  return (
    <Image
      style={[styles.logo, style]}
      resizeMode="contain"
      source={{
        uri: auth?.uni?.navLogo?.fileURL
      }}
    />
  );
});

const styles = StyleSheet.create({
  logo: {
    width: moderateScale(200),
    height: moderateScale(53),
    marginTop: SPACE.xl
  }
});
