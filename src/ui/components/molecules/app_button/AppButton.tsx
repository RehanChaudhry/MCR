import { FONT_SIZE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  ActivityIndicator,
  Image,
  ImageSourcePropType,
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

export interface AppButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  shouldShowProgressBar?: boolean;
  loaderSize?: number;
  loaderColor?: string;
  leftIcon?: ImageSourcePropType;
  rightIcon?: ImageSourcePropType;
  buttonType?: BUTTON_TYPES;
  isDisable?: boolean;
  isSelected?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
  shouldShowError?: boolean;
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
    iconStyle,
    shouldShowError = false
  }) => {
    const theme = usePreferredTheme();
    const getButtonStyle = () => {
      if (buttonType === BUTTON_TYPES.DASH) {
        return [
          style.buttonWithDash,
          { borderColor: theme.themedColors.primaryLabelColor }
        ];
      } else if (buttonType === BUTTON_TYPES.BORDER) {
        return [
          style.buttonWithBorder,
          {
            borderColor: shouldShowError
              ? theme.themedColors.error
              : theme.themedColors.primaryLabelColor
          }
        ];
      }
    };
    const getShadowStyle = () => {
      if (!isDisable && buttonType !== BUTTON_TYPES.LINK) {
        return [
          style.buttonWithShadow,
          { shadowColor: theme.themedColors.primaryBackground }
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
                ? theme.themedColors.tertiaryLabelColor
                : theme.themedColors.primaryBackground
          },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          <View style={style.leftIconContainer}>
            {leftIcon !== undefined && !shouldShowProgressBar && (
              <Image
                testID="left-icon"
                style={[
                  style.leftIcon,
                  isSelected === true
                    ? iconStyle
                    : { tintColor: theme.themedColors.primaryIconColor }
                ]}
                source={leftIcon}
              />
            )}
          </View>
          <View style={style.textWithLoader}>
            {!shouldShowProgressBar && (
              <AppLabel
                style={[
                  style.text,
                  isSelected === true
                    ? textStyle
                    : { color: theme.themedColors.primaryLabelColor }
                ]}
                text={text}
              />
            )}
            {shouldShowProgressBar && (
              <ActivityIndicator
                testID="loader"
                style={[style.loader]}
                size={loaderSize}
                color={theme.themedColors.primaryLoaderColor}
              />
            )}
          </View>
          <View style={style.rightIconContainer}>
            {rightIcon !== undefined && !shouldShowProgressBar && (
              <Image
                testID="right-icon"
                style={[
                  style.rightIcon,
                  { tintColor: theme.themedColors.primaryIconColor }
                ]}
                source={rightIcon}
              />
            )}
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
