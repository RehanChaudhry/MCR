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
import NotifyIndic from "assets/images/notification-indicator.svg";
import NotifyIndicInActive from "assets/images/notification-indicator-inactive.svg";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";

export interface ItemChatListProps extends ViewStyle {
  style?: StyleProp<ViewStyle>;
}

export const ItemChatList = React.memo<ItemChatListProps>(({}) => {
  const { themedColors } = usePreferredTheme();
  return (
    <View style={styles.container(false, themedColors)}>
      <Image
        style={styles.imgStyle}
        source={require("assets/images/d_user_pic.png")}
      />

      <NotifyIndic width={12} height={12} style={styles.indicator} />
      <NotifyIndicInActive
        width={12}
        height={12}
        style={styles.indicator}
      />

      <View style={styles.textWrapper(themedColors)}>
        <View style={styles.nameContainer}>
          <AppLabel
            style={styles.nameText(themedColors)}
            text="Phoenix walker & 2 more"
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
});

const styles = StyleSheet.create({
  container: (shouldSHowBorder: boolean, themedColors: ColorPalette) => {
    return {
      paddingHorizontal: SPACE.md,
      flexDirection: "row",
      borderStartColor: themedColors.primary,
      borderStartWidth: shouldSHowBorder ? 5 : 0
    };
  },
  indicator: {
    position: "absolute",
    start: 45,
    top: 10
  },
  imgStyle: {
    width: 45,
    height: 45,
    resizeMode: "cover",
    marginTop: SPACE.md
  },
  textWrapper: (theme: ColorPalette) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      flexDirection: "column",
      borderBottomColor: theme.interface["300"],
      borderBottomWidth: 0.5,
      flex: 1
    };
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nameText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.md,
      color: theme.primary,
      lineHeight: 25
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.interface["700"],
      lineHeight: 20,
      marginEnd: SPACE.md
    };
  },
  messageText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.label,
      lineHeight: 16
    };
  }
});
