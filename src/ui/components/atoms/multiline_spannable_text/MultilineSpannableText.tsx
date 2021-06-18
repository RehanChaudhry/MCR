import React from "react";
import { StyleProp, Text, View, ViewStyle } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";

export interface SpannableProps {
  containerStyle?: StyleProp<ViewStyle>;
  text: Array<string>;
  appLabelProps: Array<AppLabelProps>;
}

type Props = SpannableProps;

const MultilineSpannableText = React.memo<Props>(
  ({ text, containerStyle, appLabelProps }) => {
    if (
      text.length > 0 &&
      appLabelProps.length > 0 &&
      text.length === appLabelProps.length
    ) {
      return (
        <View testID={"SPANNABLE_TEXT"} style={containerStyle}>
          <Text>
            {text.map((item, index) => (
              <AppLabel
                key={index}
                text={item}
                {...appLabelProps[index]}
              />
            ))}
          </Text>
        </View>
      );
    } else {
      return <View />;
    }
  }
);

export default MultilineSpannableText;
