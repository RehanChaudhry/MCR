import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { FONT_SIZE, moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { STRINGS } from "config";

interface Props {
  style?: StyleProp<ViewStyle>;
  matchScore: number;
}

const MatchScore: React.FC<Props> = ({ style, matchScore }: Props) => {
  const { themedColors } = usePreferredTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.secondaryShade },
        style
      ]}>
      <AppLabel
        style={[styles.label, { color: themedColors.secondary }]}
        text={STRINGS.matches.match_score}
      />
      <AppLabel
        style={[styles.label, { color: themedColors.secondary }]}
        weight={"semi-bold"}
        text={matchScore ? `${matchScore}%` : STRINGS.common.not_found}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(4),
    flexDirection: "row",
    padding: moderateScale(4.0),
    justifyContent: "center"
  },
  label: { fontSize: FONT_SIZE._3xm }
});

export default MatchScore;
