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
import ChatItem, { SenderType } from "models/ChatItem";
import { moderateScale } from "config/Dimens";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";

export interface ItemChatListProps extends ViewStyle {
  onPress: () => void;
  item: ChatItem;
  style?: StyleProp<ViewStyle>;
}

export const ItemChatList = React.memo<ItemChatListProps>(
  ({ item, onPress }) => {
    const { themedColors } = usePreferredTheme();

    let prettyTime = new PrettyTimeFormat(
      "m ago",
      "s ago",
      "y ago",
      "d ago",
      "h ago"
    ).getPrettyTime(item.createdAt);

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={styles.container(
            item.name.length > 1 && !item.isMessageRead,
            themedColors
          )}>
          <Image
            style={styles.imgStyle}
            source={{
              uri: item.image
            }}
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
                text={prettyTime}
                weight="normal"
              />
            </View>
            <AppLabel
              style={styles.messageText(
                themedColors,
                item.type === SenderType.STAFF,
                item.isMessageRead
              )}
              text={item.message}
              numberOfLines={2}
              ellipsizeMode="tail"
              weight="normal"
            />

            <ListItemSeparator
              style={styles.separator}
              shouldNotOptimize={true}
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
      paddingEnd: SPACE.lg,
      paddingStart: SPACE.md,
      flexDirection: "row",
      borderStartColor: shouldShowBorder
        ? themedColors.primary
        : themedColors.backgroundSecondary,
      borderStartWidth: moderateScale(4),
      marginTop: SPACE.md
    };
  },
  indicator: {
    position: "absolute",
    start: moderateScale(45),
    top: 0,
    left: 50
  },
  imgStyle: {
    width: moderateScale(45),
    height: moderateScale(45),
    resizeMode: "cover",
    borderRadius: 45 / 2,
    overflow: "hidden"
  },
  textWrapper: (theme: ColorPalette) => {
    return {
      marginStart: SPACE.md,
      flexDirection: "column",
      borderBottomColor: theme.interface["300"],
      flex: 1,
      justifyContent: "space-between"
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
      fontSize: FONT_SIZE.sm,
      color:
        recipientLength > 1 && !isMessageRead
          ? theme.primary
          : theme.label,
      lineHeight: 20,
      paddingEnd: SPACE.sm,
      flex: 1
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.xs,
      color: theme.interface["700"],
      lineHeight: 16,
      marginEnd: SPACE.md
    };
  },
  messageText: (
    theme: ColorPalette,
    isStaffMessage: boolean,
    isMessageRead: boolean
  ) => {
    return {
      fontSize: FONT_SIZE.xs,
      color: !isMessageRead
        ? theme.label
        : isStaffMessage
        ? theme.interface["700"]
        : theme.interface["600"],
      lineHeight: 16,
      marginTop: SPACE._2xs
    };
  },
  separator: {
    marginTop: SPACE.md
  }
});
