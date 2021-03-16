import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { SvgProp } from "utils/Util";

export interface AppButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  shouldShowProgressBar?: boolean;
  loaderSize?: number;
  loaderColor?: string;
  leftIcon?: SvgProp;
  rightIcon?: SvgProp;
  buttonType?: BUTTON_TYPES;
  isDisable?: boolean;
  isSelected?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  shouldShowError?: boolean;
  shouldAlignTitleWithLeftIcon?: boolean;
}

export enum BUTTON_TYPES {
  NORMAL = "normal",
  BORDER = "border",
  DASH = "dashed",
  LINK = "link"
}

export const AppButton = React.memo<AppButtonProps>(
  ({
    text,
    onPress,
    buttonStyle,
    textStyle,
    shouldShowProgressBar = false,
    loaderSize = 15,
    leftIcon,
    rightIcon,
    buttonType = BUTTON_TYPES.NORMAL,
    isDisable = false,
    isSelected = false,
    shouldShowError = false,
    shouldAlignTitleWithLeftIcon = false
  }) => {
    const theme = usePreferredTheme();
    const getButtonStyle = () => {
      if (buttonType === BUTTON_TYPES.DASH) {
        return [
          style.buttonWithDash,
          { borderColor: theme.themedColors.label }
        ];
      } else if (buttonType === BUTTON_TYPES.BORDER) {
        return [
          style.buttonWithBorder,
          {
            borderColor: shouldShowError
              ? theme.themedColors.danger
              : theme.themedColors.border
          }
        ];
      }
    };
    const getShadowStyle = () => {
      if (!isDisable && buttonType !== BUTTON_TYPES.LINK) {
        return [
          style.buttonWithShadow,
          { shadowColor: theme.themedColors.background }
        ];
      }
    };
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={isDisable}
        style={[
          style.button,
          getShadowStyle(),
          getButtonStyle(),
          {
            backgroundColor:
              isDisable === true
                ? theme.themedColors.interface[100]
                : theme.themedColors.background
          },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          <View
            style={
              shouldAlignTitleWithLeftIcon ? null : style.leftIconContainer
            }>
            {leftIcon && !shouldShowProgressBar
              ? leftIcon?.(theme.themedColors.label, 20, 20)
              : null}
          </View>
          <View
            style={
              shouldAlignTitleWithLeftIcon ? null : style.textWithLoader
            }>
            {!shouldShowProgressBar && (
              <AppLabel
                style={[
                  style.text,
                  isSelected === true
                    ? textStyle
                    : { color: theme.themedColors.label }
                ]}
                text={text}
              />
            )}
            {shouldShowProgressBar && (
              <ActivityIndicator
                testID="loader"
                style={[style.loader]}
                size={loaderSize}
                color={theme.themedColors.label}
              />
            )}
          </View>
          <View style={style.rightIconContainer}>
            {rightIcon && !shouldShowProgressBar
              ? rightIcon?.(theme.themedColors.label, 20, 20)
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
);

const style = StyleSheet.create({
  buttonWithShadow: {
    elevation: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15
  },
  text: {
    fontSize: FONT_SIZE.md
  },
  loader: {
    marginLeft: 10
  },
  textWithLoader: {
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  leftIconContainer: {
    flex: 0.3,
    alignItems: "flex-start"
  },
  leftIcon: {
    marginLeft: 10,
    width: 20,
    height: 20
  },
  rightIconContainer: {
    flex: 0.3,
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  rightIcon: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  buttonWithBorder: {
    borderWidth: 1,
    borderStyle: "solid"
  },
  buttonWithDash: {
    borderWidth: 1,
    borderStyle: "dashed"
  },
  button: {
    alignSelf: "center",
    flexDirection: "row",
    width: "100%",
    height: 40,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center"
  }
});
