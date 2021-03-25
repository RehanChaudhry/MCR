import React from "react";
import { StyleSheet, View } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  Choice,
  DIRECTION_TYPE,
  RadioGroup
} from "ui/components/atoms/radio_group/RadioGroup";

type Props = {
  labelProps?: AppLabelProps;
  radioData: Array<Choice>;
  direction: DIRECTION_TYPE;
};

export const AppFormRadioButton: React.FC<Props> = ({
  labelProps,
  radioData,
  direction
}) => {
  const theme = usePreferredTheme();
  return (
    <View>
      {labelProps && (
        <AppLabel
          style={[styles.label, { color: theme.themedColors.label }]}
          {...labelProps}
        />
      )}
      <RadioGroup
        values={radioData}
        direction={direction}
        itemsInRow={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingBottom: SPACE.xsm
  }
});
