import React, { useState } from "react";
import {
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { COLORS, FONTS, FONT_SIZE, SPACE } from "config";

export interface AppInputFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  // default undefined
  valueToShowAtStart?: string;
  // default false
  shouldDisable?: boolean;

  rightIcon?: () => React.ReactElement | null;
  leftIcon?: () => React.ReactElement | null;
  viewStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  multiline?: boolean;
  textAlignVertical?: any;
}

type Props = AppInputFieldProps;

export const AppInputField = React.memo<Props>(
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
    //iconStyle,
    ...rest
  }) => {
    const [value, setTextInputValue] = useState(valueToShowAtStart);
    return (
      <View style={[styles.input, viewStyle]}>
        {leftIcon && (
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
          editable={!shouldDisable}
          onChangeText={(text) => {
            onChangeText?.(text);
            setTextInputValue(text);
          }}
          placeholderTextColor={COLORS.placeholderTextColor}
          style={[styles.textInput, style]}
          multiline={multiline}
          {...rest}
        />
        {rightIcon && (
          <View style={styles.rightIconView}>
            {rightIcon ? rightIcon() : null}
          </View>
        )}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  input: {
    flexDirection: "row",
    justifyContent: "center",
    color: COLORS.textColor1,
    borderStyle: "solid",
    height: 42,
    borderRadius: 5,
    borderColor: COLORS.grey3,
    paddingRight: SPACE.md,
    paddingLeft: SPACE.md,
    fontSize: FONT_SIZE.md,
    fontFamily: FONTS.regular,
    borderWidth: StyleSheet.hairlineWidth,
    flex: 1,

    //Its for IOS
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,

    // its for android
    elevation: 2,
    backgroundColor: "white"
  },
  textInput: {
    fontFamily: FONTS.regular,
    flex: 1,
    padding: 0,
    color: COLORS.textColor1
  },
  leftIconView: {
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    alignContent: "center",
    height: 42,
    paddingRight: SPACE.md
  },
  rightIconView: {
    flexDirection: "row",
    alignSelf: "flex-end",
    alignItems: "center",
    alignContent: "center",
    height: 42,
    paddingLeft: SPACE.md
  }
});
