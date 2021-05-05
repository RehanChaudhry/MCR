import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import { AppLog } from "utils/Util";
import React from "react";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { SPACE } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";

type Props = {
  listData: FormInputFieldData;
  style?: StyleProp<ViewStyle>;
  labelProps?: AppLabelProps;
  onChange: (checked: boolean) => void;
  shouldNotOptimize?: boolean;
};

export const CheckBoxGroup = optimizedMemo<Props>(
  ({ listData, labelProps }) => {
    const theme = usePreferredTheme();
    return (
      <View>
        <AppLabel
          style={[styles.label, { color: theme.themedColors.label }]}
          {...labelProps}
        />
        {listData?.options?.map((item) => (
          <CheckboxWithText
            text={item.value}
            onChange={(value, text) => AppLog.log(value + "  " + text)}
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
