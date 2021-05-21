import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import React, { useRef } from "react";
import {
  FormInputFieldData,
  OptionsData
} from "models/api_responses/RoommateAgreementResponseModel";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { FormikValues, useFormikContext } from "formik";

type Props = {
  listData: FormInputFieldData;
  style?: StyleProp<ViewStyle>;
  labelProps?: AppLabelProps;
  onChange: (checked: boolean) => void;
  shouldNotOptimize?: boolean;
  name: string;
};

export const CheckBoxGroup = optimizedMemo<Props>(
  ({ listData, labelProps, name }) => {
    const theme = usePreferredTheme();
    const { values } = useFormikContext<FormikValues>();
    let result: React.MutableRefObject<OptionsData[]> = useRef([]);
    return (
      <View>
        <AppLabel
          style={[styles.label, { color: theme.themedColors.label }]}
          {...labelProps}
        />
        {listData?.options?.map((item) => (
          <CheckboxWithText
            text={item.value}
            onChange={(checked, text) => {
              let findElement = listData.options?.filter(
                ({ value }) => value === text
              );
              if (findElement !== undefined)
                if (checked) result.current.push(findElement[0]);
                else
                  result.current = result.current.filter(
                    ({ value }) => value !== text
                  );
              values[name] = result.current;
            }}
          />
        ))}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    paddingBottom: SPACE.xs
  }
});
