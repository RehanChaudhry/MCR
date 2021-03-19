import { FONTS } from "config";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { usePreferredTheme } from "hooks";

export type Weight = "bold" | "normal" | "semi-bold";

export interface AppLabelProps extends TextProps {
  text: string;
  weight?: Weight;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  textType?: TEXT_TYPE;
}

type Props = AppLabelProps;

export enum TEXT_TYPE {
  NORMAL = "normal",
  UNDERLINE = "underline",
  LINE_THROUGH = "line-through"
}

export const AppLabel = React.memo<Props>(
  ({
    text,
    weight = "normal",
    style,
    onPress,
    textType = TEXT_TYPE.NORMAL,
    ...rest
  }) => {
    function setFontWeightStyle(
      _weight?: Weight,
      _style?: StyleProp<TextStyle>
    ) {
      return [
        _style,
        _weight === "bold"
          ? styles.bold
          : _weight === "normal"
          ? styles.normal
          : styles.semi_bold
      ];
    }
    const theme = usePreferredTheme();

    const getTextStyle = () => {
      if (textType === TEXT_TYPE.NORMAL) {
        return styles.normal;
      } else if (textType === TEXT_TYPE.UNDERLINE) {
        return styles.underLine;
      } else if (textType === TEXT_TYPE.LINE_THROUGH) {
        return styles.lineThrough;
      } else {
        return styles.normal;
      }
    };

    const textJsx = (
      <Text
        style={setFontWeightStyle(weight, [
          getTextStyle(),
          { color: theme.themedColors.label },
          style
        ])}
        numberOfLines={1}
        {...rest}>
        {text}
      </Text>
    );

    if (onPress) {
      return (
        <TouchableOpacity activeOpacity={0.3} onPress={onPress}>
          {textJsx}
        </TouchableOpacity>
      );
    } else {
      return textJsx;
    }
  }
);

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
    fontFamily: FONTS.regular
  },
  normal: {
    fontFamily: FONTS.regular
  },
  semi_bold: {
    fontFamily: FONTS.semiBold
  },
  italic: {
    fontStyle: "italic"
  },
  underLine: {
    textDecorationLine: "underline"
  },
  lineThrough: {
    textDecorationLine: "line-through"
  }
});
