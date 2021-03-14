import React, { Props } from "react";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import { AppProgressBar } from "ui/components/molecules/app_progress_bar/AppProgressBar";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export const AppProgressBarView = React.memo<Props<any>>(({}) => {
  return (
    <ThemeSwitcher>
      <AppLabel
        text="Progress bar with bottom text:"
        style={[styles.container]}
      />
      <AppProgressBar progressPercentage={28} style={styles.container} />

      <View style={{ marginTop: 20 }} />

      <AppLabel
        text="Progress bar without bottom text:"
        style={[styles.container, {}]}
      />
      <AppProgressBar
        progressPercentage={86}
        shouldShowBottomText={false}
        style={styles.container}
      />
      <View style={{ marginTop: 20 }} />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    fontWeight: "700",
    textDecorationLine: "underline",
    fontStyle: "italic"
  }
});
