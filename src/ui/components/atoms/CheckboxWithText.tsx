import { FONTS, COLORS, FONT_SIZE } from "config";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import { CheckBox } from "react-native-elements";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps extends ViewProps {
  text: string;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  onValueChange: (checked: boolean) => void;
}

type Props = OwnProps;

const CheckboxWithText = optimizedMemo<Props>(
  ({ text, isBold = false, style, onValueChange, ...rest }) => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={style}>
        <CheckBox
          Component={TouchableWithoutFeedback}
          checked={checked}
          title={text}
          containerStyle={{
            backgroundColor: COLORS.white,
            borderColor: COLORS.white
          }}
          titleProps={{ ...rest }}
          textStyle={[
            styles.checkboxText,
            isBold ? styles.bold : styles.normal
          ]}
          onPress={() => {
            setChecked((prevState) => {
              onValueChange(!prevState);
              return !prevState;
            });
          }}
        />
      </View>
    );
  }
);
const styles = StyleSheet.create({
  checkboxText: {
    fontSize: FONT_SIZE.xsm,
    marginLeft: 2,
    color: COLORS.textColor1,
    alignSelf: "center"
  },

  bold: {
    fontFamily: FONTS.bold,
    fontWeight: "normal"
  },

  normal: {
    fontFamily: FONTS.regular,
    fontWeight: "normal"
  }
});

export default CheckboxWithText;
