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
import Like from "assets/images/like.svg";
import Chat from "assets/images/chat.svg";

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
    selectedText,
    unSelectedText
  }) => {
    const [isSelected, setIsSelected] = useState(false);
    const theme = usePreferredTheme();
    return (
      <TouchableOpacity
        onPress={() => {
          setIsSelected(!isSelected);
          onValueChanged?.(!isSelected);
        }}
        style={[
          style.button,
          {
            backgroundColor: theme.themedColors.interface[200]
          },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          {unSelectedText !== "Comment" && (
            <Like
              width={12}
              height={12}
              fill={
                isSelected
                  ? theme.themedColors.primary
                  : theme.themedColors.label
              }
            />
          )}

          {unSelectedText === "Comment" && (
            <Chat width={12} height={12} fill={theme.themedColors.label} />
          )}

          <AppLabel
            style={[
              style.text,

              isSelected
                ? unSelectedText === "Comment"
                  ? { color: theme.themedColors.label }
                  : { color: theme.themedColors.primary }
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
    fontSize: FONT_SIZE._2xsm,
    marginStart: 5,
    fontFamily: FONTS.semiBold
  }
});
