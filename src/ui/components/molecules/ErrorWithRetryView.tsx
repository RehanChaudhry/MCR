import { FONT_SIZE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

type Props = {
  text?: string;
  retryCallback?: () => void;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
};

const ErrorWithRetryView = optimizedMemo<Props>(
  ({
    text = STRINGS.common.some_thing_bad_happened,
    retryCallback = () => {},
    style,
    ...rest
  }) => {
    const theme = usePreferredTheme();
    return (
      <View testID="error" style={[style, styles.container]}>
        <AppLabel
          text={text}
          style={[styles.text, { color: theme.themedColors.label }]}
          {...rest}
        />
        <AppButton
          text={STRINGS.common.try_again}
          onPress={retryCallback}
          buttonType={BUTTON_TYPES.NORMAL}
        />
      </View>
    );
  }
);
const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: FONT_SIZE.xs,
    width: "100%",
    textAlign: "center",
    margin: 20
  }
});

export default ErrorWithRetryView;
