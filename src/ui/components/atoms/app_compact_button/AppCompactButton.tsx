import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle
} from "react-native";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, FONTS } from "config";
import { SvgProp } from "utils/Util";

export interface AppCompactButtonProps extends TouchableOpacityProps {
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedText?: string;
  unSelectedText: string;
  icon?: SvgProp;
  isSelected?: boolean;
  setIsSelected?: (isSelected: boolean) => void;
  shouldIconColorChangeOnClick: boolean;
  shouldTextChangeOnClick: boolean;
  shouldShowBgColorCahange: boolean;
  onPress: () => void;
}

export const AppCompactButton = React.memo<AppCompactButtonProps>(
  ({
    buttonStyle,
    textStyle,
    selectedText,
    unSelectedText,
    icon,
    shouldIconColorChangeOnClick = false,
    shouldTextChangeOnClick = false,
    shouldShowBgColorCahange = false,
    isSelected,
    onPress
  }) => {
    const theme = usePreferredTheme();

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          style.button,
          shouldShowBgColorCahange
            ? isSelected
              ? {
                  backgroundColor: theme.themedColors.primaryShade
                }
              : {
                  backgroundColor: theme.themedColors.interface[200]
                }
            : {
                backgroundColor: theme.themedColors.interface[200]
              },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          {icon?.(
            shouldIconColorChangeOnClick
              ? isSelected
                ? theme.themedColors.primary
                : theme.themedColors.label
              : theme.themedColors.label,
            12,
            12
          )}
          <AppLabel
            style={[
              style.text,
              shouldTextChangeOnClick
                ? isSelected
                  ? { color: theme.themedColors.primary }
                  : { color: theme.themedColors.label }
                : { color: theme.themedColors.label },
              textStyle
            ]}
            text={
              (isSelected ? selectedText : unSelectedText) ??
              unSelectedText
            }
            weight={"semi-bold"}
          />
        </View>
      </TouchableOpacity>
    );
  }
);

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    paddingVertical: 6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flex: 0,
    width: "auto",
    paddingHorizontal: 10,
    alignSelf: "flex-start"
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  text: {
    fontSize: FONT_SIZE.sm,
    marginStart: 5,
    fontFamily: FONTS.semiBold
  }
});
