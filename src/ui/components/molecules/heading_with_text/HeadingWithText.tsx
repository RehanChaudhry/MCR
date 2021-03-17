import React from "react";
import { StyleProp, TextStyle, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE } from "config";

interface OwnProps {
  headingText: string;
  text: string;
  headingStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

type Props = OwnProps;

export const HeadingWithText = React.memo<Props>(
  ({ text, headingText, headingStyle, textStyle }) => {
    return (
      <View testID={"HEADING_WITH_TEXT"}>
        <AppLabel
          text={headingText}
          weight={"bold"}
          style={[{ fontSize: FONT_SIZE.lg }, headingStyle]}
        />
        <AppLabel
          text={text}
          numberOfLines={0}
          style={[{ fontSize: FONT_SIZE.md }, textStyle]}
        />
      </View>
    );
  }
);
