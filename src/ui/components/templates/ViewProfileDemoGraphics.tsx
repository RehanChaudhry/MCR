import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "ui/components/atoms/CardView";

type Props = {};

const ViewProfileDemoGraphics: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={"Demographics"}
          text={""}
          headingStyle={{ color: theme.themedColors.label }}
        />
        <View style={styles.spacer} />
        <HeadingWithText
          headingText={"Gender"}
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
          headingText={"Hometown"}
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
          headingText={"Intended Major"}
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
          headingText={"Smoking Habits"}
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
    fontSize: FONT_SIZE.xsm
  },
  textStyle: {
    marginTop: SPACE.xsm
  }
});

export default ViewProfileDemoGraphics;
