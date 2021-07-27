import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { usePreferredTheme } from "hooks";
import { AppLabelProps } from "ui/components/atoms/app_label/AppLabel";
interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  style: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
  onBoldTextPress?: () => void;
  numberOfLines?: number;
}
const LabelHtml: React.FC<Props> = ({
  containerStyle,
  text,
  style,
  onBoldTextPress,
  numberOfLines,
  textStyle
}: Props) => {
  const { themedColors } = usePreferredTheme();
  let texts: string[] = text.split(/<b>|<\/b>/g);
  const appLabelProps: AppLabelProps[] = [];
  texts.forEach((_, index) => {
    let appLabelProp: AppLabelProps;
    if (index % 2 !== 0) {
      appLabelProp = {
        onPress: index === 1 ? onBoldTextPress : undefined,
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
          textStyle
        ]
      };
    }
    appLabelProps.push(appLabelProp);
  });
  return (
    <MultilineSpannableText
      appLabelProps={appLabelProps}
      text={texts}
      numberOfLines={numberOfLines}
      containerStyle={containerStyle}
    />
  );
};
export default LabelHtml;
