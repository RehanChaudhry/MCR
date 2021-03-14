import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import {
  DIRECTION_TYPE,
  RadioGroup
} from "ui/components/atoms/radio_group/RadioGroup";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {};

export const RadioGroupScreen = React.memo<Props>(() => {
  return (
    <ThemeSwitcher>
      <AppLabel text={"Horizontal RadioGroup"} />
      <RadioGroup
        values={[
          { id: 1, label: "One" },
          { id: 2, label: "Two" },
          { id: 3, label: "Three" },
          { id: 4, label: "Four" },
          { id: 5, label: "Five" }
        ]}
        byDefaultSelected={2}
        direction={DIRECTION_TYPE.HORIZONTAL}
        itemsInRow={3}
      />

      <AppLabel text={"Vertical RadioGroup"} style={styles.text} />
      <View style={styles.verticalRadioGroup}>
        <RadioGroup
          values={[
            { id: 1, label: "Male" },
            { id: 2, label: "Female" },
            { id: 3, label: "Others" }
          ]}
          direction={DIRECTION_TYPE.VERTICAL}
          byDefaultSelected={1}
        />
      </View>
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  text: {
    marginTop: 20
  },
  verticalRadioGroup: {
    marginBottom: 40
  }
});
