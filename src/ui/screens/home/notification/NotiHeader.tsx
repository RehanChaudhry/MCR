import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import NotificationData from "models/NotificationData";
import React from "react";
import { StyleSheet } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import moment from "moment";

export const NotiHeader = React.memo(
  ({
    item,
    setSharedDataRef: sharedDataRef
  }: {
    item: NotificationData;
    setSharedDataRef: React.MutableRefObject<string>;
  }) => {
    function skipIfTagIsSameAsPrevious(label: string, tag: string) {
      if (sharedDataRef.current === tag) {
        return undefined;
      }
      sharedDataRef.current = tag;
      return label;
    }
    const getLabel = (data: NotificationData) => {
      let tag = "3";
      if (moment(data.createdAt!).isSame(moment(), "day")) {
        tag = "1";
        return skipIfTagIsSameAsPrevious("NEW NOTIFICATIONS", tag);
      } else if (
        moment(data.createdAt!).isAfter(
          moment().subtract(2, "days"),
          "day"
        )
      ) {
        tag = "2";
        return skipIfTagIsSameAsPrevious("YESTERDAY", tag);
      } else {
        return skipIfTagIsSameAsPrevious("OLDER NOTIFICATIONS", tag);
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
