import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { usePreferredTheme } from "hooks";
import { AppLabelProps } from "ui/components/atoms/app_label/AppLabel";

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  style: StyleProp<TextStyle>;
  onBoldTextPress?: () => void;
}

const LabelHtml: React.FC<Props> = ({
  containerStyle,
  text,
  style,
  onBoldTextPress
}: Props) => {
  const { themedColors } = usePreferredTheme();

  let texts: string[] = text.split("<b>");

  if (texts.length === 2) {
    texts = [texts[0], ...texts[1].split("</b>")];
  }

  const appLabelProps: AppLabelProps[] = [];
  if (texts.length === 3) {
    texts.forEach((_, index) => {
      let appLabelProp: AppLabelProps;
      if (index % 2 !== 0) {
        appLabelProp = {
          onPress: onBoldTextPress,
          style: [
            {
              color: themedColors.primary
            },
            style
          ],
          weight: "semi-bold"
        };
      } else {
        appLabelProp = {
          style: [
            {
              color: themedColors.interface[600]
            },
            style
          ]
        };
      }
      appLabelProps.push(appLabelProp);
    });
  }

  return (
    <MultilineSpannableText
      appLabelProps={appLabelProps}
      text={texts}
      containerStyle={containerStyle}
    />
  );
};

export default LabelHtml;
