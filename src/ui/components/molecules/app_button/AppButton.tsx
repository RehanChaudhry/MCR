import { FONT_SIZE, SPACE } from "config";
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
import { AppLabel, Weight } from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemoWithStyleProp } from "ui/components/templates/optimized_memo/optimized_memo";
import { SvgProp } from "utils/Util";

export interface AppButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  textDisableStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;
  shouldShowProgressBar?: boolean;
  loaderSize?: number;
  loaderColor?: string;
  leftIcon?: SvgProp | undefined;
  rightIcon?: SvgProp;
  buttonType?: BUTTON_TYPES;
  isDisable?: boolean;
  buttonDisableStyle?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  shouldShowError?: boolean;
  fontWeight?: Weight;
  shouldNotOptimize?: boolean;
  shouldAlignTextWithLeftIconWithFullWidth?: boolean;
}

export enum BUTTON_TYPES {
  NORMAL = "normal",
  BORDER = "border",
  DASH = "dashed"
}

export const AppButton = optimizedMemoWithStyleProp<AppButtonProps>(
  ({
    text,
    onPress,
    iconStyle,
    buttonStyle,
    textStyle,
    textDisableStyle,
    shouldShowProgressBar = false,
    loaderSize = 15,
    loaderColor,
    leftIcon,
    rightIcon,
    buttonType = BUTTON_TYPES.NORMAL,
    isDisable = false,
    buttonDisableStyle,
    shouldShowError = false,
    fontWeight = "normal",
    shouldAlignTextWithLeftIconWithFullWidth = false,
    textContainerStyle
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
      if (!isDisable) {
        return [
          style.buttonWithShadow,
          { shadowColor: theme.themedColors.background }
        ];
      }
    };
    return (
      <TouchableOpacity
        onPress={shouldShowProgressBar ? undefined : onPress}
        disabled={isDisable}
        style={[
          style.button,
          getShadowStyle(),
          getButtonStyle(),
          {
            backgroundColor: theme.themedColors.background
          },
          isDisable
            ? buttonDisableStyle ?? {
                backgroundColor: theme.themedColors.interface[100]
              }
            : buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          {leftIcon && !shouldShowProgressBar && (
            <View
              style={[
                iconStyle,
                style.leftIconContainer,
                !shouldAlignTextWithLeftIconWithFullWidth
                  ? style.leftIconContainerPosition
                  : undefined
              ]}>
              {leftIcon?.(theme.themedColors.label, 20, 20)}
            </View>
          )}
          <View
            style={[
              style.textWithLoader,
              !shouldAlignTextWithLeftIconWithFullWidth
                ? style.textWithLoaderFlex
                : undefined,
              textContainerStyle
            ]}>
            {!shouldShowProgressBar && (
              <AppLabel
                shouldNotOptimize={true}
                style={[
                  style.text,
                  { color: theme.themedColors.primary },
                  isDisable ? textDisableStyle : textStyle
                ]}
                text={text}
                weight={fontWeight}
              />
            )}
            {shouldShowProgressBar && (
              <ActivityIndicator
                testID="loader"
                style={[style.loader]}
                size={loaderSize}
                color={loaderColor ?? theme.themedColors.background}
              />
            )}
          </View>
          {rightIcon && !shouldShowProgressBar && (
            <View style={style.rightIconContainer}>
              {rightIcon?.(theme.themedColors.label, 20, 20)}
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
)([
  "textStyle",
  "textDisableStyle",
  "buttonStyle",
  "buttonDisableStyle",
  "style",
  "iconStyle",
  "rightIcon",
  "leftIcon"
]);

const style = StyleSheet.create({
  buttonWithShadow: {
    elevation: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15
  },
  text: {
    fontSize: FONT_SIZE.base,
    overflow: "hidden"
  },
  loader: {
    marginLeft: 10
  },
  textWithLoader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  textWithLoaderFlex: {
    flex: 1
  },
  leftIconContainer: {
    alignItems: "flex-start"
  },
  leftIconContainerPosition: {
    position: "absolute",
    left: SPACE.sm
  },
  leftIcon: {
    marginLeft: 10,
    width: 20,
    height: 20
  },
  rightIconContainer: {
    position: "absolute",
    right: SPACE.lg,
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
    height: 44,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 6
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACE.sm
  }
});
