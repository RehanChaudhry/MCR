import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "ui/components/atoms/CardView";
import Strings from "config/Strings";

type Props = {};

const ViewProfileDemoGraphics: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={Strings.profile.demoGraphics.heading}
          text={""}
          headingStyle={{ color: theme.themedColors.label }}
        />
        <HeadingWithText
          headingText={Strings.profile.dropDownTitle.gender}
          text={"Male"}
          headingFontWeight={"semi-bold"}
          textStyle={styles.textStyle}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={Strings.profile.formTitle.homeTown}
          text={"Washington, DC"}
          headingFontWeight={"semi-bold"}
          textStyle={styles.textStyle}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={Strings.profile.formTitle.intendedMajor}
          text={"Interior Architecture"}
          headingFontWeight={"semi-bold"}
          textStyle={styles.textStyle}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={
            Strings.profile.demoGraphics.radioButton.smokingHabitTitle
          }
          text={"Never"}
          headingFontWeight={"semi-bold"}
          textStyle={styles.textStyle}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg
  },
  spacer: {
    marginTop: SPACE.lg
  },
  headingStyle: {
    fontSize: FONT_SIZE.xs
  },
  textStyle: {
    marginTop: SPACE.xs
  }
});

export default ViewProfileDemoGraphics;
