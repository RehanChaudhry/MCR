import { FONT_SIZE, FONTS, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React, { useEffect, useState } from "react";
import {
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle
} from "react-native";
import CheckBox from "react-native-check-box";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

interface OwnProps extends ViewProps {
  text: string;
  isBold?: boolean;
  style?: StyleProp<ViewStyle>;
  preSelected: boolean;
  onChange: (checked: boolean, text?: string) => void;
  shouldNotOptimize?: boolean;
}

type Props = OwnProps;

const CheckboxWithText = optimizedMemo<Props>(
  ({ text, style, preSelected, onChange }) => {
    const [checked, setChecked] = useState(false);
    const theme = usePreferredTheme();

    //callback for preselected item only
    useEffect(() => {
      if (preSelected) {
        setChecked(true);
      }
      onChange?.(true, text);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [preSelected]);

    return (
      <View style={[styles.container, style]}>
        <CheckBox
          onClick={() => {
            setChecked(!checked);
            onChange(!checked, text);
          }}
          style={styles.checkBox}
          isChecked={checked}
          rightText={text}
          checkedCheckBoxColor={theme.themedColors.primary}
          uncheckedCheckBoxColor={theme.themedColors.interface["400"]}
        />
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
  },
  checkBox: {
    flex: 1,
    paddingBottom: SPACE._2md
  }
});

export default CheckboxWithText;
