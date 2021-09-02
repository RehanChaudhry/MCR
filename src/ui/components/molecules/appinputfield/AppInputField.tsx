import React, { useEffect, useState } from "react";
import {
  ImageStyle,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { COLORS, FONTS, FONT_SIZE, SPACE } from "config";
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";

export interface AppInputFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  // default undefined
  valueToShowAtStart?: string;
  // default false
  shouldDisable?: boolean;
  secureTextEntry?: boolean;

  rightIcon?: () => React.ReactElement | null;
  leftIcon?: () => React.ReactElement | null;
  viewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  multiline?: boolean;
  textAlignVertical?: any;
  shouldNotOptimize?: boolean;
  lockDefaultValue?: string | undefined;
}

type Props = AppInputFieldProps;

export const AppInputField = optimizedMemoWithStyleProp<Props>(
  ({
    onChangeText,
    style,
    valueToShowAtStart,
    shouldDisable = false,
    rightIcon,
    leftIcon,
    viewStyle,
    //iconStyle,
    multiline = false,
    textAlignVertical,
    lockDefaultValue = undefined,
    secureTextEntry = false,
    //iconStyle,
    ...rest
  }) => {
    const [value, setTextInputValue] = useState(valueToShowAtStart);

    useEffect(() => {
      setTextInputValue(valueToShowAtStart);
    }, [valueToShowAtStart]);

    const getMultiline = () => (multiline ? styles.multiline : {});

    return (
      <View style={[styles.input, viewStyle]}>
        {leftIcon?.() && (
          <View style={styles.leftIconView}>
            {leftIcon ? leftIcon() : null}
          </View>
        )}
        <TextInput
          textAlignVertical={
            textAlignVertical ? textAlignVertical : "center"
          }
          testID="InputField"
          value={value}
          secureTextEntry={secureTextEntry}
          editable={!shouldDisable}
          onChangeText={(text) => {
            if (
              lockDefaultValue === undefined ||
              text.length >= (lockDefaultValue?.length ?? 0)
            ) {
              onChangeText?.(text);
              setTextInputValue(text);
            }
          }}
          placeholderTextColor={COLORS.placeholderTextColor}
          style={[styles.textInput, style, getMultiline()]}
          multiline={multiline}
          {...rest}
          autoCapitalize="sentences"
        />
        {rightIcon?.() && (
          <View style={styles.rightIconView}>
            {rightIcon ? rightIcon() : null}
          </View>
        )}
      </View>
    );
  }
)(["style", "viewStyle", "iconStyle", "leftIcon", "rightIcon"]);

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    color: COLORS.textColor1,
    borderStyle: "solid",
    borderRadius: 6,
    flex: 1
  },
  multiline: {
    paddingBottom: SPACE.sm
  },
  textInput: {
    fontFamily: FONTS.regular,
    fontSize: FONT_SIZE.sm,
    flex: 1,
    color: COLORS.textColor1,
    textAlignVertical: "top",
    paddingHorizontal: SPACE.md,
    paddingTop: SPACE._2md,
    paddingBottom: Platform.OS === "android" ? 4 : SPACE._2md
  },
  leftIconView: {
    alignItems: "center",
    justifyContent: "center",
    paddingStart: SPACE.md
  },
  rightIconView: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    paddingEnd: SPACE.md
  }
});
