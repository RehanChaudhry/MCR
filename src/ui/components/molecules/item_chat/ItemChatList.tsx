import {
  Image,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
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
import ChatItem from "models/ChatItem";
import { moderateScale } from "config/Dimens";
export interface ItemChatListProps extends ViewStyle {
  onPress: () => void;
  item: ChatItem;
  style?: StyleProp<ViewStyle>;
}

export const ItemChatList = React.memo<ItemChatListProps>(
  ({ item, onPress }) => {
    const { themedColors } = usePreferredTheme();
    return (
      <TouchableOpacity onPress={onPress}>
        <View style={styles.container(item.name.length > 1, themedColors)}>
          <Image style={styles.imgStyle} source={item.image} />

          <NotifyIndic width={12} height={12} style={styles.indicator} />
          <NotifyIndicInActive
            width={12}
            height={12}
            style={styles.indicator}
          />

          <View style={styles.textWrapper(themedColors)}>
            <View style={styles.nameContainer}>
              <AppLabel
                style={styles.nameText(
                  themedColors,
                  item.name.length,
                  item.isMessageRead
                )}
                text={
                  item.name.length === 1
                    ? item.name[0]
                    : item.name.length === 2
                    ? item.name[0] + " & " + item.name[1]
                    : item.name[0] +
                      " & " +
                      (item.name.length - 1) +
                      " more"
                }
                weight={item.isMessageRead ? "normal" : "semi-bold"}
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
      </TouchableOpacity>
    );
  }
);

const styles = StyleSheet.create({
  container: (shouldShowBorder: boolean, themedColors: ColorPalette) => {
    return {
      paddingHorizontal: SPACE.md,
      flexDirection: "row",
      borderStartColor: shouldShowBorder
        ? themedColors.primary
        : themedColors.background,
      borderStartWidth: 5
    };
  },
  indicator: {
    position: "absolute",
    start: moderateScale(45),
    top: moderateScale(10)
  },
  imgStyle: {
    width: moderateScale(45),
    height: moderateScale(45),
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
  nameText: (
    theme: ColorPalette,
    recipientLength: number,
    isMessageRead: boolean
  ) => {
    return {
      fontSize: FONT_SIZE.md,
      color:
        recipientLength > 1 && !isMessageRead
          ? theme.primary
          : theme.interface["600"],
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
