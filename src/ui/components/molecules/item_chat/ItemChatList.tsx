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

      <View style={styles.textWrapper}>
        <View style={styles.nameContainer}>
          <AppLabel
            style={styles.nameText}
            text="Phoenix walker & 2 more"
            weight="semi-bold"
          />
          <AppLabel
            style={styles.timeText}
            text="10m ago"
            weight="normal"
          />
        </View>
        <AppLabel
          style={styles.messageText}
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
      paddingHorizontal: SPACE.two,
      flexDirection: "row",
      borderStartColor: themedColors
        ? themedColors.primaryBackground
        : "#005f46",
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
    marginTop: SPACE.two
  },
  textWrapper: {
    paddingVertical: SPACE.two,
    marginHorizontal: SPACE.two,
    flexDirection: "column",
    borderBottomColor: "#d1d5db",
    borderBottomWidth: 0.5,
    flex: 1
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nameText: {
    fontSize: FONT_SIZE.lg,
    color: "#005f46",
    lineHeight: 25
  },
  messageText: {
    fontSize: FONT_SIZE.sm,
    color: "#111827",
    lineHeight: 16
  },
  timeText: {
    fontSize: FONT_SIZE.sm,
    color: "#4b5563",
    lineHeight: 20,
    marginEnd: SPACE.two
  }
});
