import React from "react";
import {
  StyleProp,
  View,
  Text,
  TouchableWithoutFeedback,
  TextStyle,
  ViewStyle
} from "react-native";

export interface SpannableProps {
  containerStyle?: StyleProp<ViewStyle>;
  textStyle: Array<StyleProp<TextStyle>>;
  text: Array<string>;
  onPress?: (value: string, index: number) => void;
}

type Props = SpannableProps;

const MultilineSpannableText = React.memo<Props>(
  ({ textStyle, text, onPress, containerStyle }) => {
    if (
      text.length > 0 &&
      textStyle.length > 0 &&
      text.length === textStyle.length
    ) {
      return (
        <View testID={"SPANNABLE_TEXT"} style={containerStyle}>
          <Text>
            {text.map((item, index) => (
              <TouchableWithoutFeedback
                key={index}
                onPress={() => onPress?.(text[index], index)}>
                <Text style={[textStyle[index]]}>{item}</Text>
              </TouchableWithoutFeedback>
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
