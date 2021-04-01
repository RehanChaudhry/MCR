import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import ActivityLog from "models/ActivityLog";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { SvgProp } from "utils/Util";
import ActivityType from "models/enums/ActivityType";
import UserAdd from "assets/images/user-add.svg";
import { moderateScale } from "config/Dimens";
import { Divider } from "react-native-elements";
import LabelHtml from "ui/components/molecules/label_html/LabelHtml";

interface Props {
  activityLog: ActivityLog;
}

const ActivityLogItem = ({ activityLog }: Props) => {
  const { themedColors } = usePreferredTheme();
  // AppLog.log(
  //   "rendering ProfileMatchItem, item: " + JSON.stringify(profileMatch)
  // );

  const icon: SvgProp = () => {
    if (activityLog.type === ActivityType.FRIEND_REQUEST_SENT) {
      return (
        <UserAdd
          width={moderateScale(50)}
          fill={themedColors.background}
        />
      );
    } else {
      return (
        <UserAdd
          width={moderateScale(50)}
          fill={themedColors.background}
        />
      );
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
      <View style={styles.topContainer}>
        <View
          style={[
            styles.imageContainer,
            { backgroundColor: themedColors.background }
          ]}>
          <AppImageBackground
            containerStyle={{ backgroundColor: themedColors.secondary }}
            containerShape={CONTAINER_TYPES.CIRCLE}
            icon={icon}
          />
        </View>
        <LabelHtml
          containerStyle={styles.message}
          style={[
            styles.messageText,
            { color: themedColors.interface[600] }
          ]}
          text={activityLog.message ?? STRINGS.common.not_found}
        />
      </View>
      <View style={styles.bottomContainer}>
        <AppLabel
          style={[styles.date, { color: themedColors.interface[600] }]}
          text={activityLog.getDisplayTime()}
          numberOfLines={0}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    paddingHorizontal: SPACE.md
  },
  topContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  imageContainer: {
    padding: SPACE.xxsm,
    borderRadius: moderateScale(25)
  },
  message: { marginStart: SPACE.xsm },
  messageText: { fontSize: FONT_SIZE._2xsm },
  bottomContainer: {
    marginStart: moderateScale(55),
    paddingBottom: SPACE.md
  },
  date: {
    fontSize: FONT_SIZE._2xsm,
    includeFontPadding: false
  },
  verticalLine: {
    position: "absolute",
    width: moderateScale(2),
    height: "100%",
    start: moderateScale(35)
  }
});

export default ActivityLogItem;
