import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { AppLabel, Weight } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps {
  headingText: string | undefined;
  text: string | undefined;
  headingNumberOfLines?: number;
  headingStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  headingFontWeight?: Weight;
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

export const HeadingWithText = optimizedMemoWithStyleProp<Props>(
  ({
    text,
    headingText,
    headingStyle,
    textStyle,
    headingFontWeight = "normal",
    headingNumberOfLines = 1
  }) => {
    return (
      <View testID={"HEADING_WITH_TEXT"}>
        {headingText !== undefined && headingText !== "" && (
          <AppLabel
            text={headingText}
            weight={headingFontWeight}
            numberOfLines={headingNumberOfLines}
            style={[{ fontSize: FONT_SIZE.base }, headingStyle]}
          />
        )}
        {text !== undefined && text !== "" && (
          <AppLabel
            text={text}
            numberOfLines={0}
            style={[{ fontSize: FONT_SIZE.sm }, textStyle]}
          />
        )}
      </View>
    );
  }
)(["headingStyle", "textStyle"]);
