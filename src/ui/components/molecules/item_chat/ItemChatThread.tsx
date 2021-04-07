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
import { moderateScale } from "config/Dimens";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";

export interface ItemChatThreadProps extends ViewStyle {
  item: ChatItem;
  style?: StyleProp<ViewStyle>;
}

export const ItemChatThread = React.memo<ItemChatThreadProps>(
  ({ style, item }) => {
    const { themedColors } = usePreferredTheme();

    let prettyTime = new PrettyTimeFormat().getPrettyTime(item.createdAt);

    return (
      <View style={[styles.container, style]}>
        <Image
          style={styles.imgStyle}
          source={{
            uri: item.image
          }}
        />

        <View style={styles.textWrapper(themedColors, item.userId === 1)}>
          <View style={styles.nameContainer}>
            <AppLabel
              style={styles.nameText(themedColors)}
              text={item.name[0]}
              weight="semi-bold"
            />
            <AppLabel
              style={styles.timeText(themedColors)}
              text={prettyTime}
              weight="normal"
            />
          </View>
          <AppLabel
            style={styles.messageText(themedColors)}
            text={item.message}
            numberOfLines={0}
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
    flexDirection: "row"
  },
  indicator: {
    position: "absolute",
    start: moderateScale(45),
    top: moderateScale(10)
  },
  imgStyle: {
    width: 32,
    height: 32,
    resizeMode: "cover",
    borderRadius: 45 / 2
  },
  textWrapper: (theme: ColorPalette, isCurrentUser: boolean) => {
    return {
      paddingVertical: SPACE.md,
      marginStart: SPACE.md,
      paddingHorizontal: SPACE.md,
      flexDirection: "column",
      borderRadius: 12,
      flex: 1,
      backgroundColor: isCurrentUser
        ? theme.background
        : theme.primaryShade
    };
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  nameText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.interface["800"],
      lineHeight: 20
    };
  },
  messageText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.sm,
      color: theme.label,
      lineHeight: 20,
      paddingTop: SPACE.xs
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.xs,
      color: theme.interface["700"],
      lineHeight: 16
    };
  }
});
