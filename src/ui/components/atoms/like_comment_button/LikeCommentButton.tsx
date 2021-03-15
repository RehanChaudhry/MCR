import React, { useState } from "react";
import {
  ImageStyle,
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
import { Color } from "react-native-svg";

export interface LikeButtonProps extends TouchableOpacityProps {
  onValueChanged?: (isSelected: boolean) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedText?: string;
  unSelectedText: string;
  iconStyle?: StyleProp<ImageStyle>;
  icon?:
    | ((isSelected: boolean, color: Color) => React.ReactElement)
    | null;
}

export const LikeCommentButton = React.memo<LikeButtonProps>(
  ({
    onValueChanged,
    buttonStyle,
    textStyle,
    icon,
    selectedText,
    unSelectedText
  }) => {
    const theme = usePreferredTheme();
    const [isSelected, setIsSelected] = useState(false);

    return (
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          onValueChanged?.(!isSelected);
        }}
        style={[
          style.button,
          {
            backgroundColor: theme.themedColors.tertiaryIconColor
          },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          {icon?.(isSelected, theme.themedColors.primaryIconColor)}
          <AppLabel
            style={[
              style.text,

              isSelected
                ? textStyle
                : { color: theme.themedColors.primaryLabelColor }
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
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    flex: 0,
    width: "auto",
    paddingHorizontal: 16,
    alignSelf: "flex-start"
  },
  viewContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  leftIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain"
  },
  text: {
    fontSize: FONT_SIZE.sm,
    marginStart: 5,
    fontFamily: FONTS.semiBold
  }
});
