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
import { useAuth, usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { SenderType } from "models/ChatItem";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import { Conversation } from "models/api_responses/ChatsResponseModel";
import { User } from "models/User";
import _ from "lodash";

export interface ItemChatListProps extends ViewStyle {
  onPress: () => void;
  item: Conversation;
  style?: StyleProp<ViewStyle>;
}

export const ItemChatList = React.memo<ItemChatListProps>(
  ({ item, onPress }) => {
    const { themedColors } = usePreferredTheme();
    const { user } = useAuth();
    let prettyTime = new PrettyTimeFormat(
      "m ago",
      "s ago",
      "y ago",
      "d ago",
      "h ago"
    ).getPrettyTime(item.lastMessagedAt.toString());

    let isMessageRead = false;
    isMessageRead =
      _.isArray(item.message) &&
      item.message.length > 0 &&
      item.message[0].readBy.find(
        (userId) => userId === user?.profile?.id
      ) !== undefined;

    return (
      <TouchableOpacity onPress={onPress}>
        <View
          style={styles.container(
            item.conversationUsers.length > 1 && !item.isMessageRead,
            themedColors
          )}>
          <Image
            style={styles.imgStyle}
            source={
              item.conversationUsers.length > 0
                ? {
                    uri: item.conversationUsers[0].profilePicture?.fileURL
                  }
                : require("assets/images/profile.png")
            }
          />

          {item.conversationUsers.length > 0 &&
          item.conversationUsers.find(
            (value: User) => value.online === 1
          ) !== undefined ? (
            <NotifyIndic width={10} height={10} style={styles.indicator} />
          ) : (
            <NotifyIndicInActive
              width={10}
              height={10}
              style={styles.indicator}
            />
          )}

          <View style={styles.textWrapper(themedColors)}>
            <View style={styles.nameContainer}>
              <AppLabel
                style={styles.nameText(
                  themedColors,
                  item.conversationUsers.length,
                  isMessageRead
                )}
                text={
                  item.conversationUsers.length === 1
                    ? new User(item.conversationUsers[0]).fullName()
                    : item.conversationUsers.length === 2
                    ? new User(item.conversationUsers[0]).fullName() +
                      " & " +
                      new User(item.conversationUsers[1]).fullName()
                    : new User(item.conversationUsers[0]).fullName() +
                      " & " +
                      (item.conversationUsers.length - 1) +
                      " more"
                }
                weight={isMessageRead ? "normal" : "semi-bold"}
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
                item.userType === SenderType.STAFF,
                isMessageRead
              )}
              text={
                _.isArray(item.message) && item.message[0] !== undefined
                  ? item.message[0].text
                  : ""
              }
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
      borderStartWidth: 4
    };
  },
  indicator: {
    position: "absolute",
    start: 40,
    top: 0,
    left: 43
  },
  imgStyle: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 40 / 2,
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
      paddingEnd: SPACE.sm,
      flex: 1
    };
  },
  timeText: (theme: ColorPalette) => {
    return {
      fontSize: FONT_SIZE.xs,
      color: theme.interface["700"],
      marginEnd: SPACE.lg
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
      marginTop: SPACE._2xs,
      marginEnd: SPACE.lg
    };
  },
  separator: {
    marginTop: SPACE.md
  }
});
