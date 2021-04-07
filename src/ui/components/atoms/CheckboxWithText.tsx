import { FONT_SIZE, FONTS, SPACE } from "config";
import React, { useState } from "react";
import {
  Image,
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
          onClick={() => {
            setChecked(!checked);
            onChange(!checked);
          }}
          style={styles.checkBox}
          isChecked={checked}
          rightText={text}
          checkedImage={
            <Image
              source={require("assets/images/selected.png")}
              style={{ width: 20, height: 20 }}
            />
          }
          unCheckedImage={
            <Image
              source={require("assets/images/unselected.png")}
              style={{ width: 20, height: 20 }}
            />
          }
        />
        {/*<CheckBox*/}
        {/*  disabled={false}*/}
        {/*  value={checked}*/}
        {/*  onValueChange={(value) => {*/}
        {/*    setChecked(value);*/}
        {/*    onChange(value);*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<AppLabel text={text} style={styles.checkboxText} />*/}
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
