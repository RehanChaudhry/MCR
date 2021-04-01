import { SPACE } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
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
    <View
      style={[styles.container, { borderColor: themedColors.separator }]}>
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
