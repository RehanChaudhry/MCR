import React from "react";
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { usePreferredTheme } from "hooks";
import { AppLabelProps } from "ui/components/atoms/app_label/AppLabel";
interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  text: string;
  textStyle: StyleProp<TextStyle>;
  onBoldTextPress?: (boldText?: string) => void;
  numberOfLines?: number;
  shouldNotOptimize?: boolean;
  allowclickOnAllOddIndexes?: boolean;
}
const LabelHtml: React.FC<Props> = ({
  containerStyle,
  text,
  textStyle,
  onBoldTextPress,
  numberOfLines,
  shouldNotOptimize = false,
  allowclickOnAllOddIndexes = false
}: Props) => {
  const { themedColors } = usePreferredTheme();
  let texts: string[] = text.split(/<b>|<\/b>/g);
  const appLabelProps: AppLabelProps[] = [];
  texts.forEach((_, index) => {
    let appLabelProp: AppLabelProps;
    if (index % 2 !== 0) {
      appLabelProp = {
        onPress: () => {
          allowclickOnAllOddIndexes || index === 1
            ? onBoldTextPress?.(_)
            : undefined;
        },
        style: [
          {
            color: themedColors.primary
          },
          textStyle
        ],
        weight: "semi-bold",
        shouldNotOptimize: shouldNotOptimize
      };
    } else {
      appLabelProp = {
        style: [
          {
            color: themedColors.interface[600]
          },
          textStyle
        ],
        shouldNotOptimize: shouldNotOptimize
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
