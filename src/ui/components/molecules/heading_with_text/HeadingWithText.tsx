import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { AppLabel, Weight } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  headingText: string;
  text: string;
  headingStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  headingFontWeight?: Weight;
}

type Props = OwnProps;

export const HeadingWithText = optimizedMemo<Props>(
  ({
    text,
    headingText,
    headingStyle,
    textStyle,
    headingFontWeight = "normal"
  }) => {
    return (
      <View testID={"HEADING_WITH_TEXT"}>
        <AppLabel
          text={headingText}
          weight={headingFontWeight}
          style={[{ fontSize: FONT_SIZE.lg }, headingStyle]}
        />
        <AppLabel
          text={text}
          numberOfLines={0}
          style={[{ fontSize: FONT_SIZE.xsm }, textStyle]}
        />
      </View>
    );
  }
);
