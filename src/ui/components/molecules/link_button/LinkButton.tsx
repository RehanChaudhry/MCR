import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel, Weight } from "ui/components/atoms/app_label/AppLabel";
import { SvgProp } from "utils/Util";

export interface LinkButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: SvgProp;
  rightIcon?: SvgProp;
  iconStyle?: StyleProp<ImageStyle>;
  viewStyle?: StyleProp<ViewStyle>;
  fontWeight?: Weight;
}

export const LinkButton = React.memo<LinkButtonProps>(
  ({
    text,
    onPress,
    textStyle,
    leftIcon,
    rightIcon,
    viewStyle,
    fontWeight = "normal"
  }) => {
    const theme = usePreferredTheme();
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={[style.container, viewStyle]}>
          {leftIcon ? leftIcon?.(theme.themedColors.label, 20, 20) : null}
          <AppLabel
            weight={fontWeight}
            style={[
              style.text,
              { color: theme.themedColors.primary },
              textStyle,
              leftIcon
                ? { paddingLeft: SPACE.sm }
                : { paddingRight: SPACE.sm }
            ]}
            text={text}
          />
          {rightIcon
            ? rightIcon?.(theme.themedColors.label, 20, 20)
            : null}
        </View>
      </TouchableOpacity>
    );
  }
);

const style = StyleSheet.create({
  text: {
    fontSize: FONT_SIZE.xsm,
    includeFontPadding: false
  },
  leftIcon: {
    marginLeft: 10,
    width: 20,
    height: 20
  },
  rightIcon: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});
