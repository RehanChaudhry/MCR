import CheckBox from "@react-native-community/checkbox";
import { FONT_SIZE, FONTS, SPACE } from "config";
import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps extends ViewProps {
  text: string;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  onChange: (checked: boolean) => void;
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

const CheckboxWithText = optimizedMemo<Props>(
  ({ text, style, onChange }) => {
    const [checked, setChecked] = useState(false);
    return (
      <View style={[styles.container, style]}>
        <CheckBox
          disabled={false}
          value={checked}
          onValueChange={(value) => {
            setChecked(value);
            onChange(value);
          }}
        />
        <AppLabel text={text} style={styles.checkboxText} />
      </View>
    );
  }
);
const styles = StyleSheet.create({
  checkboxText: {
    fontSize: FONT_SIZE.sm,
    marginLeft: SPACE.sm
  },

  bold: {
    fontFamily: FONTS.bold,
    fontWeight: "normal"
  },

  normal: {
    fontFamily: FONTS.regular,
    fontWeight: "normal"
  },
  container: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default CheckboxWithText;
