import { FONTS } from "config";
import { FONT_SIZE_LINE_HEIGHT } from "config/Dimens";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  TextStyle
} from "react-native";
import { usePreferredTheme } from "hooks";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export type Weight = "bold" | "normal" | "semi-bold";

export interface AppLabelProps extends TextProps {
  text?: string;
  weight?: Weight;
  style?: StyleProp<TextStyle>;
  onPress?: () => void;
  textType?: TEXT_TYPE;
  shouldNotOptimize?: boolean;
}

type Props = AppLabelProps;

export enum TEXT_TYPE {
  NORMAL = "normal",
  UNDERLINE = "underline",
  LINE_THROUGH = "line-through"
}

export const AppLabel = optimizedMemo<Props>(
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

    return (
      <Text
        onPress={onPress}
        style={setFontWeightStyle(weight, [
          getTextStyle(),
          { color: theme.themedColors.label },
          {
            lineHeight: FONT_SIZE_LINE_HEIGHT.ofFontSize(
              // @ts-ignore
              StyleSheet.flatten(style)?.fontSize ?? 13.0
            )
          },
          style
        ])}
        numberOfLines={1}
        {...rest}>
        {text}
      </Text>
    );
  }
);

const styles = StyleSheet.create({
  bold: {
    fontFamily: FONTS.bold
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
