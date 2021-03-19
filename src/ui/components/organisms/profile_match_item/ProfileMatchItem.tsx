import { FONT_SIZE, SPACE } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLog, shadowStyleProps } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";

interface Props {
  profileMatch: ProfileMatch;
}

const ProfileMatchItem = ({ profileMatch }: Props) => {
  const { themedColors } = usePreferredTheme();
  AppLog.log(
    "rendering ProfileMatchItem, item: " + JSON.stringify(profileMatch)
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    marginVertical: SPACE.xsm,
    padding: SPACE.xsm,

    ...shadowStyleProps
  },
  expandedContainer: {
    flexDirection: "column",
    padding: SPACE.xsm,
    overflow: "hidden",
    borderTopStartRadius: 5,
    borderTopEndRadius: 5,
    marginTop: SPACE.xsm

    // shadow
    // ...shadowStyleProps
  },
  title: { fontSize: FONT_SIZE.md, padding: SPACE.xsm },
  description: { fontSize: FONT_SIZE.sm, padding: SPACE.xsm },
  arrowContainer: {
    width: moderateScale(30),
    height: moderateScale(30),
    marginRight: moderateScale(5)
  }
});

export default ProfileMatchItem;
