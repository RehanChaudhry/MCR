import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { FONTS } from "config";

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
  let texts: string[] = text.split("<b>");

  if (texts.length === 2) {
    texts = [texts[0], ...texts[1].split("</b>")];
  }

  const textStyles: StyleProp<TextStyle>[] = [];
  if (texts.length === 3) {
    texts.forEach((_, index) => {
      let fontWeightStyle: StyleProp<TextStyle>;
      if (index % 2 !== 0) {
        fontWeightStyle = { fontFamily: FONTS.semiBold };
      } else {
        fontWeightStyle = { fontFamily: FONTS.regular };
      }
      textStyles.push([fontWeightStyle, style]);
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
