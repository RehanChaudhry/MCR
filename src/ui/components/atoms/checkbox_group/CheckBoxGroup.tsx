import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { StyleProp, View, ViewStyle } from "react-native";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import React from "react";
import { OptionsData } from "models/api_responses/RoommateAgreementResponseModel";

type CheckBoxGroupProps = {
  listData: OptionsData[];
  onChange: (checked: boolean, text: string) => void;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
};

export const CheckBoxGroup = optimizedMemo<CheckBoxGroupProps>(
  ({ listData, onChange }) => {
    return (
      <View>
        {listData?.map((item) => (
          <CheckboxWithText
            text={item.value}
            onChange={(checked, text) => {
              onChange?.(checked, text!!);
            }}
          />
        ))}
      </View>
    );
  }
);
