import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import Questionnaire from "assets/images/office-building.svg";
import Settings from "assets/images/settings.svg";
import Profile from "assets/images/profile.svg";
import UserAdd from "assets/images/user-add.svg";
import Chat from "assets/images/chat_round.svg";
import Agreement from "assets/images/agreement_icon.svg";
import UserRejected from "assets/images/user_sub.svg";
import RoommateRequest from "assets/images/request_state_icon.svg";
import Dismissed from "assets/images/folder-remove.svg";
import NewsPaper from "assets/images/newspaper.svg";
import { Divider } from "react-native-elements";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";
import ActivityLog, { getMessage } from "models/ActivityLog";
import NotificationAndActivityLogFilterType from "models/enums/NotificationAndActivityLogFilterType";
import Actions from "models/enums/ActivityLogAction";
import useAuth from "hooks/useAuth";
import { PrettyTimeFormat } from "utils/PrettyTimeFormat";

interface Props {
  activityLog: ActivityLog;
  navigateToScreen: (
    activityLog: ActivityLog,
    clickedText?: string
  ) => void;
}

const ActivityLogItem = ({ activityLog, navigateToScreen }: Props) => {
  const { themedColors } = usePreferredTheme();
  const { user } = useAuth();
  const DateFormatter = new PrettyTimeFormat();
  let formattedDate = DateFormatter.getPrettyTime(
    (activityLog.createdAt as unknown) as string
  );
  const [prettyTime, setPrettyTime] = useState<string>(formattedDate);

  const icon: any = () => {
    if (activityLog.type != null) {
      if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.LOGIN_STUDENT ||
        (NotificationAndActivityLogFilterType.LOGIN_STAFF &&
          activityLog.action === Actions.LOGIN)
      ) {
        return <Profile width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.QUESTIONAIRE &&
        activityLog.action === Actions.CREATE
      ) {
        return <Questionnaire width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.PROFILE &&
        activityLog.action === Actions.UPDATED
      ) {
        return <Settings width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        activityLog.action === Actions.CREATE
      ) {
        return (
          <RoommateRequest width={20} fill={themedColors.background} />
        );
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
        activityLog.action === Actions.ACCEPTED
      ) {
        return <UserAdd width={20} fill={themedColors.background} />;
      } else if (
        (activityLog.type ===
          NotificationAndActivityLogFilterType.FRIEND_REQUEST &&
          activityLog.action === Actions.REJECTED) ||
        (activityLog.type ===
          NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
          activityLog.action === Actions.REJECTED)
      ) {
        return <UserRejected width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        activityLog.action === Actions.CREATE
      ) {
        return (
          <RoommateRequest width={20} fill={themedColors.background} />
        );
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.ROOMMATE_REQUEST &&
        activityLog.action === Actions.ACCEPTED
      ) {
        return (
          <RoommateRequest width={20} fill={themedColors.background} />
        );
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.DISMISSED_LIST &&
        activityLog.action === Actions.CREATE
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.RESTORED &&
        activityLog.action === Actions.CREATE
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
        activityLog.action === Actions.UPDATED_AND_AGREED
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.CONVERSATION &&
        activityLog.action === Actions.CREATE
      ) {
        return <Chat width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.COMMENT &&
        activityLog.action === Actions.CREATE
      ) {
        return <Chat width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === NotificationAndActivityLogFilterType.POST &&
        activityLog.action === Actions.CREATE
      ) {
        return <NewsPaper width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.ROOMMATE_AGREEMENT &&
        activityLog.action === Actions.ACCEPTED
      ) {
        return <Agreement width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.BLOCKED &&
        activityLog.action === Actions.CREATE
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type ===
          NotificationAndActivityLogFilterType.BLOCKED &&
        activityLog.action === Actions.DELETE
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      }
    } else {
      return null;
    }
  };

  useEffect(() => {
    setPrettyTime(
      DateFormatter.getPrettyTime(
        (activityLog!.createdAt as unknown) as string
      )
    );
    let id = setInterval(() => {
      setPrettyTime(
        DateFormatter.getPrettyTime(
          (activityLog!.createdAt as unknown) as string
        )
      );
    }, 5000);
    return () => {
      clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formattedDate]);

  return (
    <View
      style={[styles.container, { borderColor: themedColors.separator }]}>
      <Divider
        style={[
          styles.verticalLine,
          { backgroundColor: themedColors.separator }
        ]}
      />
      <View style={styles.startContainer}>
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: themedColors.background }
          ]}>
          <AppImageBackground
            containerStyle={[
              styles.iconContainer,
              { backgroundColor: themedColors.secondary }
            ]}
            containerShape={CONTAINER_TYPES.CIRCLE}
            icon={icon}
          />
        </View>
      </View>
      <View style={styles.endContainer}>
        <LabelHtml
          containerStyle={styles.message}
          textStyle={styles.messageText}
          numberOfLines={3}
          allowclickOnAllOddIndexes={true}
          onBoldTextPress={(clickedText) =>
            navigateToScreen(activityLog, clickedText)
          }
          text={getMessage(activityLog, user) ?? STRINGS.common.not_found}
          shouldNotOptimize={true}
        />
        <AppLabel
          style={[styles.date, { color: themedColors.interface[600] }]}
          text={prettyTime}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },
  startContainer: {},
  imageContainer: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20
  },
  //backgroundColor: "red", paddingTop: 10
  message: {},
  messageText: { fontSize: FONT_SIZE.sm },
  endContainer: {
    flex: 1,
    marginStart: SPACE.md,
    paddingTop: SPACE._2xs,
    justifyContent: "flex-start",
    paddingBottom: 14
  },
  date: {
    fontSize: FONT_SIZE.sm,
    marginTop: SPACE._2xs
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    start: 18
  },
  iconContainer: {
    width: 32,
    height: 32
  }
});

export default ActivityLogItem;
