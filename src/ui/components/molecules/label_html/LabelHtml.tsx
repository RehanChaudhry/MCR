import React from "react";
import { StyleProp, TextStyle, View, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";

interface Props {
  containerStyle: StyleProp<ViewStyle>;
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
        fontWeightStyle = { fontWeight: "bold" };
      } else {
        fontWeightStyle = { fontWeight: "normal" };
      }
      textStyles.push([fontWeightStyle, style]);
    });
  }

  return (
    <View style={containerStyle}>
      <MultilineSpannableText textStyle={textStyles} text={texts} />
    </View>
  );
};

export default LabelHtml;
