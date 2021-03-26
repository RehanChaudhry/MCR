import { FONT_SIZE } from "config";
import React from "react";
import { StyleSheet, TouchableOpacityProps } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export interface HeaderTitleProps extends TouchableOpacityProps {
  text: string;
}

export const HeaderTitle = React.memo<HeaderTitleProps>(({ text }) => {
  return (
    <AppLabel text={text} weight="semi-bold" style={style.headerTitle} />
  );
});

const style = StyleSheet.create({
  headerTitle: {
    fontSize: FONT_SIZE.lg
  }
});
