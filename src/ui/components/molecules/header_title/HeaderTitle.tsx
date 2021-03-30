import { FONT_SIZE } from "config";
import React from "react";
import {
  StyleSheet,
  TextStyle,
  TouchableOpacityProps
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export interface HeaderTitleProps extends TouchableOpacityProps {
  text: string;
  labelStyle?: TextStyle;
}

export const HeaderTitle = React.memo<HeaderTitleProps>(
  ({ text, labelStyle }) => {
    return (
      <AppLabel
        text={text}
        weight="semi-bold"
        style={[style.headerTitle, labelStyle]}
      />
    );
  }
);

const style = StyleSheet.create({
  headerTitle: {
    fontSize: FONT_SIZE.sm
  }
});
