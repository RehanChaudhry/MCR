import React, { useState } from "react";
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle
} from "react-native";
import { COLORS, FONTS, FONT_SIZE } from "config";

export interface AppInputFieldProps extends TextInputProps {
  style?: StyleProp<TextStyle>;
  // default undefined
  valueToShowAtStart?: string;
  // default false
  shouldDisable?: boolean;

  rightIcon?: () => React.ReactElement | null;
  leftIcon?: () => React.ReactElement | null;
  viewStyle?: StyleProp<ViewStyle>;
  //iconStyle?: StyleProp<ImageStyle>;
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
    ...rest
  }) => {
    const [value, setTextInputValue] = useState(valueToShowAtStart);
    return (
      <View style={[styles.input, viewStyle]}>
        {leftIcon ? leftIcon() : null}
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
        {rightIcon ? rightIcon() : null}
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
    height: 40,
    borderRadius: 5,
    borderColor: COLORS.grey3,
    paddingTop: 6,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    fontSize: FONT_SIZE.md,
    fontFamily: FONTS.regular,
    borderWidth: StyleSheet.hairlineWidth,

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
    //backgroundColor: Colors.red
    //height: "100%"
    // width: "100%"
  }
  // leftIconStyle: {
  //   height: 16,
  //   width: 16,
  //   marginTop: 6,
  //   marginRight: 8,
  //   alignSelf: "flex-start"
  // },
  // rightIconStyle: {
  //   height: 16,
  //   width: 16,
  //   marginTop: 6,
  //   marginLeft: 8,
  //   alignSelf: "flex-end"
  // }
});
