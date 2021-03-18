import {
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle
} from "react-native";
import React from "react";
import { FONT_SIZE, SPACE } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { usePreferredTheme } from "hooks";

export interface ItemChatThreadProps extends ViewStyle {
  style?: StyleProp<ViewStyle>;
}

export const ItemChatThread = React.memo<ItemChatThreadProps>(
  ({ style }) => {
    const { themedColors } = usePreferredTheme();
    return (
      <View style={[styles.container, style]}>
        <Image
          style={styles.imgStyle}
          source={require("assets/images/d_user_pic.png")}
        />

        <View style={styles.textWrapper(themedColors)}>
          <View style={styles.nameContainer}>
            <AppLabel
              style={styles.nameText(themedColors)}
              text="Phoenix walker"
              weight="semi-bold"
            />
            <AppLabel
              style={styles.timeText(themedColors)}
              text="10m ago"
              weight="normal"
            />
          </View>
          <AppLabel
            style={styles.messageText(themedColors)}
            text="OK, I'll let him know.. sorry just saw your message"
            numberOfLines={2}
            ellipsizeMode="tail"
            weight="normal"
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACE.md,
    paddingHorizontal: SPACE.md,
    flexDirection: "row"
  },
  indicator: {
    position: "absolute",
    start: 45,
    top: 10
  },
  imgStyle: {
    width: 45,
    height: 45,
    resizeMode: "cover"
  },
  textWrapper: (theme: ColorPalette) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "column",
      borderRadius: 10,
      flex: 1,
      backgroundColor: theme.primaryShade
    };
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: SPACE.sm
  },
  nameText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.md,
      color: theme.interface["800"]
    };
  },
  messageText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.label,
      lineHeight: 16
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.interface["700"],
      lineHeight: 20
    };
  }
});
