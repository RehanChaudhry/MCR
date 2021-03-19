import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { AppLog, shadowStyleProps } from "utils/Util";
import ProfileMatch from "models/ProfileMatch";
import { moderateScale } from "config/Dimens";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import MatchScore from "ui/components/molecules/match_score/MatchScore";

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
      ]}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.profileImage}
          source={{ uri: profileMatch.profilePicture }}
        />
        <View style={styles.infoTextContainer}>
          <AppLabel
            style={styles.userName}
            text={profileMatch.userName ?? STRINGS.common.not_found}
          />
          <AppLabel
            style={[styles.subtitle, { color: grayShades.coolGray[600] }]}
            text={`${profileMatch.classLevel}, ${profileMatch.major}`}
          />
          <MatchScore
            style={styles.matchScore}
            matchScore={profileMatch.matchScore ?? 0}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    borderRadius: 5,
    padding: SPACE.md,
    ...shadowStyleProps
  },
  infoContainer: {
    flexDirection: "row"
  },
  profileImage: {
    width: moderateScale(64),
    height: moderateScale(64),
    borderRadius: moderateScale(32)
  },
  infoTextContainer: {
    marginStart: SPACE.md
  },
  userName: { fontSize: FONT_SIZE.md, includeFontPadding: false },
  subtitle: { fontSize: FONT_SIZE.xsm },
  matchScore: {
    marginTop: SPACE.md
  }
});

export default ProfileMatchItem;
