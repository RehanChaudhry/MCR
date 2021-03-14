import React from "react";
import {
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
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, FONTS } from "config";

export interface LikeButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  text: string;
  buttonStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: ImageSourcePropType;
  isSelected?: boolean;
  iconStyle?: StyleProp<ImageStyle>;
}

export const LikeCommentButton = React.memo<LikeButtonProps>(
  ({
    onPress,
    text,
    buttonStyle,
    leftIcon,
    isSelected = false,
    iconStyle,
    textStyle
  }) => {
    const theme = usePreferredTheme();

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[
          style.button,
          {
            backgroundColor: theme.themedColors.tertiaryIconColor
          },
          buttonStyle
        ]}>
        <View testID="button-container" style={style.viewContainer}>
          <Image
            testID="left-icon"
            style={[
              style.leftIcon,
              isSelected
                ? iconStyle
                : { tintColor: theme.themedColors.primaryIconColor }
            ]}
            source={leftIcon!}
          />

          <AppLabel
            style={[
              style.text,

              isSelected
                ? textStyle
                : { color: theme.themedColors.primaryLabelColor }
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
