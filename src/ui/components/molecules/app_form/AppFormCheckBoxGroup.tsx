import { usePreferredTheme } from "hooks";
import { OptionsData } from "models/api_responses/RoommateAgreementResponseModel";
import { FormikValues, useFormikContext } from "formik";
import React, { useRef } from "react";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { View } from "react-native";
import { CheckBoxGroup } from "ui/components/atoms/checkbox_group/CheckBoxGroup";
import { AppLog } from "utils/Util";

type AppFormCheckBoxGroupProps = {
  name: string;
  labelProps?: AppLabelProps;
  listData: OptionsData[];
};

export const AppFormCheckBoxGroup: React.FC<AppFormCheckBoxGroupProps> = ({
  listData,
  labelProps,
  name
}) => {
  const theme = usePreferredTheme();
  const { setFieldValue, values } = useFormikContext<FormikValues>();
  let result: React.MutableRefObject<OptionsData[]> = useRef([]);

  return (
    <View>
      {labelProps && (
        <AppLabel
          numberOfLines={0}
          style={[{ color: theme.themedColors.label }]}
          {...labelProps}
        />
      )}

      <CheckBoxGroup
        listData={listData}
        preSelected={values[name]}
        onChange={(checked: boolean, text?: string) => {
          AppLog.log(
            "Checkbox check changed : " +
              checked +
              " and text is : " +
              text
          );
          let findElement = listData?.filter(
            ({ value }) => value === text
          );
          if (findElement !== undefined) {
            if (checked) {
              result.current.push(findElement[0]);
            } else {
              result.current = result.current.filter(
                ({ value }) => value !== text
              );
            }
            setFieldValue(name, result.current);
          }
        }}
      />
    </View>
  );
};
