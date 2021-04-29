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
import { Divider } from "react-native-elements";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";
import ActivityLog from "models/ActivityLog";
import ActivityLogType from "models/enums/ActivityLogType";
import Actions from "models/enums/ActivityLogAction";
import { AppLog } from "utils/Util";

interface Props {
  activityLog: ActivityLog;
}

const ActivityLogItem = ({ activityLog }: Props) => {
  const { themedColors } = usePreferredTheme();
  AppLog.log("message: " + activityLog.getMessage());
  // AppLog.log(
  //   "rendering ProfileMatchItem, item: " + JSON.stringify(profileMatch)
  // );

  // const icon: SvgProp = () => {
  //   switch (activityLog.type) {
  //     // case ActivityType.ALL:
  //     //   return <Profile width={20} fill={themedColors.background} />;
  //     case ActivityType.ADDED_TO_DISMISSED:
  //       return <Dismissed width={20} fill={themedColors.background} />;
  //     case ActivityType.CREATED_CONVERSATION:
  //       return <Conversation width={20} fill={themedColors.background} />;
  //     case ActivityType.CREATED_POST:
  //       return <Post width={20} fill={themedColors.background} />;
  //     case ActivityType.ROOMMATE_REQUEST_SENT:
  //       return (
  //         <RoommateRequest width={20} fill={themedColors.background} />
  //       );
  //     case ActivityType.UPDATED_QUESTIONNAIRE:
  //       return <Questionnaire width={20} fill={themedColors.background} />;
  //     case ActivityType.UPDATED_PROFILE:
  //       return <Profile width={20} fill={themedColors.background} />;
  //     case ActivityType.UPDATED_AGREEMENT:
  //       return (
  //         <RoommateAgreement width={20} fill={themedColors.background} />
  //       );
  //     case ActivityType.COMMENT:
  //       return <Comment width={20} fill={themedColors.background} />;
  //     case ActivityType.FRIEND_REQUEST_SENT:
  //       return <UserAdd width={20} fill={themedColors.background} />;
  //     default:
  //       return <Profile width={20} fill={themedColors.background} />;
  //   }
  // };

  const icon: any = () => {
    if (activityLog.type != null) {
      if (
        activityLog.type === ActivityLogType.FRIEND_REQUEST &&
        activityLog.action === Actions.SENT
      ) {
        return <Questionnaire width={20} fill={themedColors.background} />;
      } else if (
        activityLog.type === ActivityLogType.FRIEND_REQUEST &&
        activityLog.action === Actions.REJECTED
      ) {
        return <Questionnaire width={20} fill={themedColors.background} />;
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
    flexDirection: "row",
    paddingHorizontal: SPACE.md
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
    start: 31
  },
  iconContainer: {
    width: 32,
    height: 32
  }
});

export default ActivityLogItem;
