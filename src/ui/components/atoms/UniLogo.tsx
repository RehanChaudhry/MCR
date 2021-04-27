import { moderateScale, SPACE } from "config/Dimens";
import { useAuth } from "hooks";
import React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { SvgCssUri } from "react-native-svg";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  shouldNotOptimize?: boolean;
  style?: StyleProp<ViewStyle>;
}

type Props = OwnProps;

export const UniLogo = optimizedMemo<Props>(({ style }) => {
  const auth = useAuth();

  return (
    <SvgCssUri
      uri={auth?.uni?.navLogo?.fileURL ?? null}
      style={[styles.logo, style]}
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