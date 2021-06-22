import { FONT_SIZE, SPACE, STRINGS } from "config";
import Colors from "config/Colors";
import Fonts from "config/Fonts";
import { usePreferredTheme } from "hooks";
import NotificationData, {
  getButtonText,
  getDisplayTime,
  getMessage
} from "models/NotificationData";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CircleImageBorder } from "ui/components/atoms/circle_image_border/CircleImageBorder";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import NotificationActionType from "models/enums/NotificationActionType";
import Chat from "assets/images/chat_round.svg";
import Like from "assets/images/agreed.svg";
import UserGroup from "assets/images/user_group.svg";
import OfficeBuilding from "assets/images/office-building.svg";
import Announcement from "assets/images/announcements.svg";
import { AppLog } from "utils/Util";

type Props = {
  notification: NotificationData;
  userNameOnPress: (userId: number) => void;
  actionOnPress: (type: string, postId?: number) => void;
};

export const CircleImageWithText = React.memo<Props>(
  ({ notification, userNameOnPress, actionOnPress }) => {
    const theme = usePreferredTheme();

    const icon: any = () => {
      if (notification.type != null) {
        if (
          notification.type ===
            NotificationAndActivityLogFilterType.POST &&
          notification.action === NotificationActionType.COMMENT
        ) {
          return (
            <Chat width={14} fill={theme.themedColors.interface[400]} />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.POST &&
          notification.action === NotificationActionType.LIKE
        ) {
          return (
            <Like width={14} fill={theme.themedColors.interface[400]} />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
          notification.action === NotificationActionType.ACCEPT
        ) {
          return (
            <UserGroup
              width={14}
              fill={theme.themedColors.interface[400]}
            />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
          notification.action === NotificationActionType.RECIEVE
        ) {
          return (
            <UserGroup
              width={14}
              fill={theme.themedColors.interface[400]}
            />
          );
        } else if (
          (notification.type ===
            NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
            notification.action === NotificationActionType.RECIEVE) ||
          notification.action === NotificationActionType.ACCEPT ||
          notification.action === NotificationActionType.RESPOND
        ) {
          return (
            <OfficeBuilding
              width={14}
              fill={theme.themedColors.interface[400]}
            />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.ANNOUNCEMENT &&
          notification.action === NotificationActionType.RECIEVE
        ) {
          return (
            <Announcement
              width={12}
              fill={theme.themedColors.interface[400]}
            />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.CHAT &&
          notification.action === NotificationActionType.RECIEVE
        ) {
          return (
            <Chat width={12} fill={theme.themedColors.interface[400]} />
          );
        } else if (
          (notification.type ===
            NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
            notification.action === NotificationActionType.DISAGREE) ||
          notification.action === NotificationActionType.AGREE
        ) {
          return (
            <OfficeBuilding
              width={12}
              fill={theme.themedColors.interface[400]}
            />
          );
        } else if (
          notification.type ===
            NotificationAndActivityLogFilterType.CONVERSATION &&
          notification.action === NotificationActionType.CREATE
        ) {
          return (
            <Chat width={12} fill={theme.themedColors.interface[400]} />
          );
        } else if (
          (notification.type ===
            NotificationAndActivityLogFilterType.ROOMMATE_GROUP &&
            notification.action === NotificationActionType.UPDATE) ||
          notification.action === NotificationActionType.LEAVE ||
          notification.action === NotificationActionType.ENTER
        ) {
          return (
            <OfficeBuilding
              width={12}
              fill={theme.themedColors.interface[400]}
            />
          );
        }
      }
    };

    return (
      <View style={styles.mainContainer}>
        <CircleImageBorder
          imageUrl={notification?.sender?.profilePicture?.fileURL!}
          icon={icon}
        />
        <View style={styles.viewRequest}>
          <View style={styles.circleWithText}>
            <LabelHtml
              style={styles.messageText}
              numberOfLines={3}
              onBoldTextPress={() => {
                AppLog.logForcefully(
                  () => "userID: " + notification.senderId!
                );
                userNameOnPress(notification.senderId!);
              }}
              text={getMessage(notification) ?? STRINGS.common.not_found}
            />
          </View>
          <View style={styles.requestButtonWithText}>
            <AppLabel
              text={getDisplayTime(notification)}
              style={[
                styles.time,
                { color: theme.themedColors.interface["700"] }
              ]}
            />
          </View>
          <View style={styles.buttonContainer}>
            <LinkButton
              text={getButtonText(notification)!}
              viewStyle={[
                styles.buttonStyle,
                { backgroundColor: theme.themedColors.primaryShade }
              ]}
              onPress={() => {
                actionOnPress(notification?.type!, notification?.id);
              }}
              fontWeight="bold"
              textStyle={styles.buttonText}
            />
          </View>
          <View
            style={[
              styles.view,
              { backgroundColor: theme.themedColors.interface["300"] }
            ]}
          />
        </View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: "row",
    flexBasis: 0.1
  },
  circleWithText: {
    flexDirection: "row"
  },

  requestButtonWithText: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: SPACE._2xs
  },
  buttonStyle: {
    borderRadius: 8,
    elevation: 0,
    paddingLeft: SPACE.sm,
    paddingTop: SPACE.sm,
    paddingBottom: SPACE.sm
  },
  view: {
    backgroundColor: Colors.grey2,
    height: 0.5,
    width: "100%",
    alignSelf: "flex-end",
    marginTop: SPACE.md
  },
  name: { fontFamily: Fonts.bold, fontSize: FONT_SIZE.sm },
  message: { fontSize: FONT_SIZE.sm },
  boldText: {
    fontFamily: Fonts.regular,
    fontSize: FONT_SIZE.sm
  },
  time: {
    fontSize: FONT_SIZE.xs
  },
  buttonText: {
    fontSize: FONT_SIZE.xs
  },
  viewRequest: {
    flex: 1
  },
  messageText: { fontSize: FONT_SIZE.sm },
  buttonContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row"
  }
});
