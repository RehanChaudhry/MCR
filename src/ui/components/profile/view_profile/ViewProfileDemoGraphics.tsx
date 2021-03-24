import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "../../../../config";
import { HeadingWithText } from "../../molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";

type Props = {};

const ViewProfileDemoGraphics: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <View style={styles.mainContainer}>
      <HeadingWithText
        headingText={"Demographics"}
        text={""}
        headingStyle={{ color: theme.themedColors.label }}
      />
      <View style={styles.spacer} />
      <HeadingWithText
        headingText={"Gender"}
        text={"Male"}
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
        textStyle={styles.textStyle}
        headingStyle={[
          styles.headingStyle,
          { color: theme.themedColors.labelSecondary }
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: SPACE._4xl
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

export default ViewProfileDemoGraphics;
