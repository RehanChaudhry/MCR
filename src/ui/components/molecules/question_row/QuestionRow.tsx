import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import { usePreferredTheme } from "hooks";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import Question from "models/Question";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";

interface Props {
  style?: StyleProp<ViewStyle>;
  question: Question;
}

const QuestionRow = ({ question, style }: Props) => {
  const theme = usePreferredTheme();
  return (
    <View
      style={[
        styles.expandedContainer,
        {
          backgroundColor: theme.themedColors.primaryBackground,
          borderColor: theme.themedColors.tertiaryLabelColor
        },
        style
      ]}>
      <AppLabel
        style={styles.title}
        text={question.title}
        weight={"semi-bold"}
      />
      <AppLabel
        style={[
          styles.rangeSliderLabel,
          { color: theme.themedColors.secondaryLabelColor }
        ]}
        text="<Range slider here>"
      />
      <View style={styles.comfortZoneContainer}>
        <AppLabel
          style={styles.comfortZoneLabel}
          text="Comfort Zone"
          weight={"semi-bold"}
        />
        <View style={styles.noPreferenceContainer}>
          <AppLabel
            style={styles.comfortZoneLabel}
            text="I have no preference"
            weight={"semi-bold"}
          />
          <AppSwitch
            style={styles.appSwitch}
            defaultValue={false}
            onValueChange={() => {}}
          />
        </View>
      </View>
      <AppLabel
        style={[
          styles.rangeSliderLabel,
          { color: theme.themedColors.secondaryLabelColor }
        ]}
        text="<Range slider here>"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  expandedContainer: {
    flexDirection: "column",
    padding: 5,
    overflow: "hidden",
    borderTopWidth: StyleSheet.hairlineWidth

    // shadow
    // shadowColor: "#000000",
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.8,
    // shadowRadius: 2,
    // elevation: 5
  },
  title: { fontSize: FONT_SIZE.sm, padding: SPACE.one },
  rangeSliderLabel: { fontSize: FONT_SIZE.sm, padding: SPACE.one },
  comfortZoneLabel: { fontSize: FONT_SIZE.xsm },
  comfortZoneContainer: {
    paddingHorizontal: SPACE.one,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  noPreferenceContainer: { flexDirection: "row", alignItems: "center" },
  appSwitch: { marginStart: SPACE.one }
});

export default QuestionRow;
