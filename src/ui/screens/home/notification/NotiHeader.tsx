import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import NotificationData from "models/NotificationData";
import React from "react";
import { StyleSheet } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export const NotiHeader = React.memo(
  ({
    item,
    setSharedDataRef: sharedDataRef
  }: {
    item: NotificationData;
    setSharedDataRef: React.MutableRefObject<string>;
  }) => {
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
      // let label = "NEW NOTIFICATIONS";
      let tag = "3";
      if (hours > 48) {
        tag = "3";
      } else if (hours >= 0 && hours <= 24) {
        tag = "1";
      } else if (hours > 24 || hours < 48) {
        tag = "2";
      }

      if (tag === "1") {
        return skipIfTagIsSameAsPrevious("NEW NOTIFICATIONS", tag);
      } else if (tag === "2") {
        return skipIfTagIsSameAsPrevious("OLDER NOTIFICATIONS", tag);
      } else if (tag === "3") {
        return skipIfTagIsSameAsPrevious("YESTERDAY", tag);
      }
    };

    const theme = usePreferredTheme();

    let label = getLabel(item);
    if (label === undefined) {
      return null;
    }

    return (
      <AppLabel
        text={label}
        style={[
          styles.header,
          { color: theme.themedColors.interface["600"] }
        ]}
        weight={"semi-bold"}
      />
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontSize: FONT_SIZE.xs,
    marginBottom: SPACE.lg
  }
});
