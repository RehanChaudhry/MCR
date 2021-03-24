import React, { useState } from "react";
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
  onValueChanged?: (isSelected: boolean) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedText?: string;
  unSelectedText: string;
  icon?: SvgProp;
  shouldSelected?: boolean;
  shouldIconColorChangeOnClick: boolean;
  shouldTextChangeOnClick: boolean;
  shouldShowBgColorCahange: boolean;
  onPress: () => void;
}

export const AppCompactButton = React.memo<AppCompactButtonProps>(
  ({
    onValueChanged,
    buttonStyle,
    textStyle,
    selectedText,
    unSelectedText,
    icon,
    shouldIconColorChangeOnClick = false,
    shouldTextChangeOnClick = false,
    shouldShowBgColorCahange = false,
    shouldSelected,
    onPress
  }) => {
    const [isSelected, setIsSelected] = useState(shouldSelected);
    const theme = usePreferredTheme();

    return (
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          onValueChanged?.(!isSelected);
          onPress();
        }}
        style={[
          style.button,
          shouldShowBgColorCahange
            ? isSelected || shouldSelected
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
              ? isSelected || shouldSelected
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
                ? isSelected || shouldSelected
                  ? { color: theme.themedColors.primary }
                  : { color: theme.themedColors.label }
                : { color: theme.themedColors.label },
              textStyle
            ]}
            text={
              (isSelected || shouldSelected
                ? selectedText
                : unSelectedText) ?? unSelectedText
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
