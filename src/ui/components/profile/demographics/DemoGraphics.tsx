import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";

export const DemoGraphics = React.memo(() => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
      <HeadingWithText
        headingText={"Demographics"}
        text={"Please take a moment to tell us more about you."}
        headingStyle={[
          styles.headingStyle,
          { color: theme.themedColors.label }
        ]}
        textStyle={[{ color: theme.themedColors.labelSecondary }]}
      />
      <View
        style={[
          styles.horizontalLine,
          { backgroundColor: theme.themedColors.interface["700"] }
        ]}
      />
    </CardView>
  );
});

const styles = StyleSheet.create({
  cardStyles: {
    margin: SPACE.lg,
    padding: SPACE.lg
  },
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
    paddingVertical: SPACE.sm
  },
  horizontalLine: {
    height: 0.5,
    marginVertical: SPACE.lg
  }
});
