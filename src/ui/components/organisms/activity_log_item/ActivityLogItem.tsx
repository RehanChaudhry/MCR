import { FONT_SIZE, FONTS, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { shadowStyleProps } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";
import { moderateScale } from "config/Dimens";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MatchScore from "ui/components/molecules/match_score/MatchScore";
import ProfileMatchType from "models/enums/ProfileMatchType";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ChatRound from "assets/images/chat_round.svg";
import Cross from "assets/images/ic_cross.svg";
import ActivityLog from "models/ActivityLog";

interface Props {
  activityLog: ActivityLog;
}

const ActivityLogItem = ({ activityLog }: Props) => {
  const { themedColors } = usePreferredTheme();
  // AppLog.log(
  //   "rendering ProfileMatchItem, item: " + JSON.stringify(profileMatch)
  // );

  return (
    <View style={[styles.container]}>
      <AppLabel text={activityLog.message} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACE.md
  }
});

export default ActivityLogItem;
