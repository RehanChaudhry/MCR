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
import { AppLog } from "utils/Util";

type Props = {
  name: string;
  labelProps?: AppLabelProps;
  radioData: Array<Choice>;
  direction: DIRECTION_TYPE;
  name: string;
};

export const AppFormRadioButton: React.FC<Props> = ({
  name,
  labelProps,
  radioData,
  direction,
  name
}) => {
  const theme = usePreferredTheme();

  const { setFieldValue, values } = useFormikContext<FormikValues>();

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
        onChange={(value: Choice, index: number) => {
          AppLog.log("Select radio button index : " + index);
          setFieldValue(name, value);
        }}
        byDefaultSelected={radioData.findIndex(
          (item) =>
            item.value.toLowerCase() ===
            values[name]?.toString().toLowerCase()
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  value: {
    paddingBottom: SPACE.xs
  }
});
