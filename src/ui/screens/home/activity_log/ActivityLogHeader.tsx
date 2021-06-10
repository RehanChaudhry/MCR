import React from "react";
import NotificationData from "models/NotificationData";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import ActivityLog from "models/ActivityLog";

export const ActivityLogHeader = React.memo(
  ({
    item,
    setSharedDataRef: sharedDataRef
  }: {
    item: ActivityLog;
    setSharedDataRef: React.MutableRefObject<string>;
  }) => {
    const { themedColors } = usePreferredTheme();
    const getHours = (prevDate?: Date) => {
      if (!prevDate) {
        return 0;
      }
      const currDate1 = new Date();
      let d1: any = new Date(currDate1); //firstDate
      let d2: any = new Date(prevDate); //SecondDate
      let diff = Math.abs(d1 - d2);
      const hours = diff / (1000 * 60 * 60); //in milliseconds

      // eslint-disable-next-line radix
      return parseInt(hours.toFixed(0));
    };

    function skipIfTagIsSameAsPrevious(label: string, tag: string) {
      if (sharedDataRef.current === tag) {
        return undefined;
      }
      sharedDataRef.current = tag;
      return label;
    }
    const getLabel = (data: NotificationData) => {
      let hours = getHours(data.createdAt);
      let tag = "3";
      if (hours > 48) {
        tag = "3";
      } else if (hours >= 0 && hours <= 24) {
        tag = "1";
      } else if (hours > 24 || hours < 48) {
        tag = "2";
      }

      if (tag === "1") {
        return skipIfTagIsSameAsPrevious("RECENT ACTIVITIES", tag);
      } else if (tag === "2") {
        return skipIfTagIsSameAsPrevious("YESTURDAY", tag);
      } else if (tag === "3") {
        return skipIfTagIsSameAsPrevious("OLDER NOTIFICATIONS", tag);
      }
    };

    let label = getLabel(item);
    if (label === undefined) {
      return null;
    }

    return (
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: themedColors.backgroundSecondary }
        ]}>
        <AppLabel
          text={label}
          style={[
            styles.headerText,
            { color: themedColors.interface[600] }
          ]}
          weight={"semi-bold"}
        />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  headerContainer: { paddingVertical: SPACE.lg },
  headerText: { fontSize: FONT_SIZE.xs }
});
