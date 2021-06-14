import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { StyleProp, View, ViewStyle } from "react-native";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import React from "react";
import { OptionsData } from "models/api_responses/RoommateAgreementResponseModel";
import EIntBoolean from "models/enums/EIntBoolean";
import { AppLog } from "utils/Util";

type CheckBoxGroupProps = {
  listData: OptionsData[];
  onChange: (checked: boolean, text: string) => void;
  preSelected?: [string] | undefined;
  style?: StyleProp<ViewStyle>;
  shouldNotOptimize?: boolean;
  isLocked?: EIntBoolean;
};

export const CheckBoxGroup = optimizedMemo<CheckBoxGroupProps>(
  ({ listData, onChange, preSelected, isLocked = EIntBoolean.FALSE }) => {
    AppLog.log(() => "PreSelected = " + preSelected);
    return (
      <View>
        {listData?.map((item) => (
          <CheckboxWithText
            text={item.value}
            onChange={(checked, text) => {
              !isLocked && onChange?.(checked, text!!);
            }}
            preSelected={
              preSelected !== undefined &&
              preSelected?.find((data) => data === item.value) !==
                undefined
            }
            isLocked={isLocked}
          />
        ))}
      </View>
    );
  }
);
