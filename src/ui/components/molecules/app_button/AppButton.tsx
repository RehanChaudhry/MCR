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
import { SvgProp } from "utils/Util";
import { moderateScale } from "config/Dimens";

export interface AppButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  shouldShowProgressBar?: boolean;
  loaderSize?: number;
  loaderColor?: string;
  leftIcon?: SvgProp | undefined;
  rightIcon?: SvgProp;
  buttonType?: BUTTON_TYPES;
  isDisable?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  shouldShowError?: boolean;
  fontWeight?: Weight;
  shouldAlignTextWithLeftIconWithFullWidth?: boolean;
}

export enum BUTTON_TYPES {
  NORMAL = "normal",
  BORDER = "border",
  DASH = "dashed"
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
    shouldShowError = false,
    fontWeight = "normal",
    shouldAlignTextWithLeftIconWithFullWidth = false
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
          {leftIcon && !shouldShowProgressBar && (
            <View
              style={[
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
                : undefined
            ]}>
            {!shouldShowProgressBar && (
              <AppLabel
                style={[
                  style.text,
                  { color: theme.themedColors.primary },
                  textStyle
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
                color={theme.themedColors.label}
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
);

const style = StyleSheet.create({
  buttonWithShadow: {
    elevation: 1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.15
  },
  text: {
    fontSize: FONT_SIZE.xsm,
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
    height: moderateScale(40),
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
