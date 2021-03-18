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
import ChatItem from "models/ChatItem";

export interface ItemChatThreadProps extends ViewStyle {
  item: ChatItem;
  style?: StyleProp<ViewStyle>;
}

export const ItemChatThread = React.memo<ItemChatThreadProps>(
  ({ style, item }) => {
    const { themedColors } = usePreferredTheme();
    return (
      <View style={[styles.container, style]}>
        <Image style={styles.imgStyle} source={item.image} />

        <View style={styles.textWrapper(themedColors, item.userId === 1)}>
          <View style={styles.nameContainer}>
            <AppLabel
              style={styles.nameText(themedColors)}
              text={item.name[0]}
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
            text={item.message}
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
  textWrapper: (theme: ColorPalette, isCurrentUser: boolean) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "column",
      borderRadius: 10,
      flex: 1,
      backgroundColor: isCurrentUser
        ? theme.background
        : theme.primaryShade
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
