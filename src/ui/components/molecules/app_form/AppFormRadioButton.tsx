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
import { FormikValues, useFormikContext } from "formik";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";

type Props = {
  labelProps?: AppLabelProps;
  radioData: Array<Choice>;
  direction: DIRECTION_TYPE;
  name: string;
};

export const AppFormRadioButton: React.FC<Props> = ({
  labelProps,
  radioData,
  direction,
  name
}) => {
  const theme = usePreferredTheme();
  const { errors, touched, values } = useFormikContext<FormikValues>();
  return (
    <View>
      {labelProps && (
        <AppLabel
          numberOfLines={0}
          style={[styles.value, { color: theme.themedColors.label }]}
          {...labelProps}
        />
      )}
      <RadioGroup
        values={radioData!}
        direction={direction}
        itemsInRow={3}
        onChange={(item) => {
          values[name] = item.value;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  value: {
    paddingBottom: SPACE.xs
  }
});
