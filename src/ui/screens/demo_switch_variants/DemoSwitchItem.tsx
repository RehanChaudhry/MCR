import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";
import { usePreferredTheme } from "hooks";

type props = {
  item: any;
};
export const DemoSwitchItem = React.memo<props>(({ item }) => {
  const { themedColors } = usePreferredTheme();
  return (
    <View style={[styles.themeSwitcherRoot]}>
      <AppLabel
        text={item.text}
        style={{ color: themedColors.primaryLabelColor }}
      />
      <AppSwitch defaultValue={item.isEnabled} onValueChange={() => {}} />
    </View>
  );
});

const styles = StyleSheet.create({
  themeSwitcherRoot: {
    flexDirection: "row",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "space-between"
  }
});
