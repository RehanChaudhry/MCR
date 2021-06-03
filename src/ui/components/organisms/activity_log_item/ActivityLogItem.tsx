import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
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
import RoommateRequest from "assets/images/request_state_icon.svg";
import Dismissed from "assets/images/folder-remove.svg";
import { Divider } from "react-native-elements";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";
import ActivityLog from "models/ActivityLog";
import ActivityLogType from "models/enums/ActivityLogType";
import Actions from "models/enums/ActivityLogAction";

interface Props {
  activityLog: ActivityLog;
}

const ActivityLogItem = ({ activityLog }: Props) => {
  const { themedColors } = usePreferredTheme();
  //AppLog.log("message: " + activityLog.getMessage());

  const icon: any = () => {
    if (activityLog.type != null) {
      if (
        activityLog.type === ActivityLogType.LOGIN_STUDENT ||
        (ActivityLogType.LOGIN_STAFF &&
          activityLog.action === Actions.LOGIN)
      ) {
        return <Profile width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.QUESTIONAIRE &&
        activityLog.action === Actions.CREATE
      ) {
        return <Questionnaire width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.PROFILE &&
        activityLog.action === Actions.UPDATED
      ) {
        return <Settings width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.FRIEND_REQUEST &&
        activityLog.action === Actions.CREATE
      ) {
        return <UserAdd width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.ROOMMATE_REQUEST &&
        activityLog.action === Actions.CREATE
      ) {
        return (
          <RoommateRequest width={20} fill={themedColors.background} />
        );
      } else if (
        activityLog.type === ActivityLogType.DISMISSED_LIST &&
        activityLog.action === Actions.CREATE
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.ROOMMATE_AGREEMENT &&
        activityLog.action === Actions.UPDATED_AND_AGREED
      ) {
        return <Dismissed width={20} fill={themedColors.background} />;
      }
    } else {
      return null;
    }
  };

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
          style={styles.messageText}
          text={activityLog.getMessage() ?? STRINGS.common.not_found}
        />
        <AppLabel
          style={[styles.date, { color: themedColors.interface[600] }]}
          text={activityLog.getDisplayTime()}
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
