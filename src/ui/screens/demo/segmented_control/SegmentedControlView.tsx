import React from "react";
import { StyleSheet } from "react-native";
import { SegmentedControl } from "ui/components/molecules/segmented_control/SegmentedControl";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";

type Props = {};

export const SegmentedControlView = React.memo<Props>(() => {
  return (
    <ThemeSwitcher>
      <SegmentedControl
        values={[
          { label: "Label 1", value: "Value 1" },
          { label: "Label 2", value: "Value 2" }
        ]}
      />
      <SegmentedControl
        containerStyle={styles.perItem}
        values={[
          { label: "Label 1", value: "Value 1" },
          { label: "Label 2", value: "Value 2" },
          { label: "Label 3", value: "Value 3" }
        ]}
      />
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  perItem: { marginVertical: 12 }
});
