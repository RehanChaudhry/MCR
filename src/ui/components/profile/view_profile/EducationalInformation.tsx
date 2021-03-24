import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "ui/components/atoms/CardView";

type Props = {};

const EducationalInformation: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={"Educational Information"}
          text={""}
          headingStyle={{ color: theme.themedColors.label }}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={"Student ID"}
          text={"182883499"}
          headingFontWeight={"semi-bold"}
          textStyle={[styles.textStyle]}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={"Programs"}
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
          headingText={"Building"}
          text={"East Green, Perkins Hall"}
          headingFontWeight={"semi-bold"}
          textStyle={styles.textStyle}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.labelSecondary }
          ]}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={"Room"}
          text={"N/A"}
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
    marginTop: SPACE.xsm
  },
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingVertical: SPACE.lg
  },
  spacer: {
    marginTop: SPACE.lg
  },
  headingStyle: {
    fontSize: FONT_SIZE.md
  },
  textStyle: {
    marginTop: SPACE.xsm
  }
});

export default EducationalInformation;
