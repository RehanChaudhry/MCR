import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { FONTS } from "config";
import { usePreferredTheme } from "hooks";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  style: StyleProp<TextStyle>;
}

const LabelHtml: React.FC<Props> = ({
  containerStyle,
  text,
  style
}: Props) => {
  const { themedColors } = usePreferredTheme();

  let texts: string[] = text.split("<b>");

  if (texts.length === 2) {
    texts = [texts[0], ...texts[1].split("</b>")];
  }

  const textStyles: StyleProp<TextStyle>[] = [];
  if (texts.length === 3) {
    texts.forEach((_, index) => {
      let textStyle: StyleProp<TextStyle>;
      if (index % 2 !== 0) {
        textStyle = {
          fontFamily: FONTS.semiBold,
          color: themedColors.primary
        };
      } else {
        textStyle = {
          fontFamily: FONTS.regular,
          color: themedColors.interface[600]
        };
      }
      textStyles.push([textStyle, style]);
    });
  }

  return (
    <MultilineSpannableText
      textStyle={textStyles}
      text={texts}
      containerStyle={containerStyle}
    />
  );
};

export default LabelHtml;
