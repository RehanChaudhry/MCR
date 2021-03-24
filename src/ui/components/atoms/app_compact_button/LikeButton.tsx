import React, { useState } from "react";
import { usePreferredTheme } from "hooks";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import Like from "assets/images/like.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, FONTS } from "config";

type Props = {
  onValueChanged?: (isSelected: boolean) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  selectedText?: string;
  unSelectedText: string;
  onPress?: () => void;
};

export const LikeButton = React.memo<Props>(
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
          isSelected
            ? { backgroundColor: theme.themedColors.primaryShade }
            : { backgroundColor: theme.themedColors.interface[200] },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          <Like
            width={12}
            height={12}
            fill={
              isSelected
                ? theme.themedColors.primary
                : theme.themedColors.label
            }
          />

          <AppLabel
            style={[
              style.text,

              isSelected
                ? { color: theme.themedColors.primary }
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
