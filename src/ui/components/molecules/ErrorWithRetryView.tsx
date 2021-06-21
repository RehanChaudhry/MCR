import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { SvgProp } from "utils/Util";

type Props = {
  image?: SvgProp;
  text?: string;
  retryCallback?: () => void;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
};

const ErrorWithRetryView = optimizedMemo<Props>(
  ({
    image,
    text = STRINGS.common.some_thing_bad_happened,
    retryCallback = () => {},
    style,
    ...rest
  }) => {
    const theme = usePreferredTheme();
    return (
      <View testID="error" style={[style, styles.container]}>
        {image && (
          <View style={styles.imageContainer}>
            {image?.(theme.themedColors.primary, 100, 100)}
          </View>
        )}
        <AppLabel
          text={text}
          weight={"semi-bold"}
          style={[styles.text, { color: theme.themedColors.label }]}
          {...rest}
        />
        <AppButton
          buttonStyle={[
            {
              backgroundColor: theme.themedColors.primary
            },
            styles.buttonStyles
          ]}
          textContainerStyle={styles.buttonTextContainer}
          textStyle={{ color: theme.themedColors.background }}
          fontWeight={"semi-bold"}
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
    height: "100%",
    alignItems: "center",
    padding: SPACE.lg
  },
  text: {
    fontSize: FONT_SIZE.base,
    textAlign: "center",
    margin: 20
  },
  buttonStyles: {
    width: undefined,
    paddingHorizontal: SPACE.xl
  },
  buttonTextContainer: { flex: undefined },
  imageContainer: { marginBottom: SPACE.xl }
});

export default ErrorWithRetryView;
