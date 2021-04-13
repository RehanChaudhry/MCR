import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { FONT_SIZE, SPACE } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { STRINGS } from "config";

interface Props {
  style?: StyleProp<ViewStyle>;
  matchScore: string;
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
        text={matchScore}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    flexDirection: "row",
    paddingHorizontal: SPACE.sm,
    paddingVertical: SPACE._2xs,
    justifyContent: "center",
    alignItems: "center"
  },
  label: { fontSize: FONT_SIZE.xs, includeFontPadding: false }
});

export default MatchScore;
