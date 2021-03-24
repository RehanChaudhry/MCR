import { FONT_SIZE, FONTS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { SvgProp } from "utils/Util";

type Props = {
  onValueChanged?: (isSelected: boolean) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  shouldSelected: boolean;
  text: string;
  icon?: SvgProp;
  onPress?: () => void;
};
export const PhotosEmbedButton = React.memo<Props>(
  ({
    buttonStyle,
    shouldSelected = false,
    textStyle,
    text,
    icon,
    onPress
  }) => {
    const theme = usePreferredTheme();
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          style.button,
          shouldSelected
            ? { backgroundColor: theme.themedColors.primaryShade }
            : { backgroundColor: theme.themedColors.interface[200] },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          {icon?.(
            shouldSelected
              ? theme.themedColors.primary
              : theme.themedColors.label,
            20,
            20
          )}
          <AppLabel
            style={[
              style.text,
              shouldSelected
                ? { color: theme.themedColors.primary }
                : { color: theme.themedColors.label },
              textStyle
            ]}
            text={text}
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
