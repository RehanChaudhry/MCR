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
import EIntBoolean from "models/enums/EIntBoolean";

type AppFormCheckBoxGroupProps = {
  name: string;
  labelProps?: AppLabelProps;
  listData: OptionsData[];
  isLocked: EIntBoolean;
};

export const AppFormCheckBoxGroup: React.FC<AppFormCheckBoxGroupProps> = ({
  listData,
  labelProps,
  name,
  isLocked = EIntBoolean.FALSE
}) => {
  const theme = usePreferredTheme();
  const {
    setFieldValue,
    initialValues
  } = useFormikContext<FormikValues>();
  let result: React.MutableRefObject<OptionsData[]> = useRef([]);

  /*AppLog.logForcefully(
    "AppFormCheckboxGroup => initialValues " +
      JSON.stringify(initialValues[name]) +
      " field name is : " +
      name
  );*/

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
        preSelected={initialValues[name]}
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
        isLocked={isLocked}
      />
    </View>
  );
};
