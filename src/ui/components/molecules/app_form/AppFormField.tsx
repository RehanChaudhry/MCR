import { FormikValues, useFormikContext } from "formik";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import {
  AppInputField,
  AppInputFieldProps
} from "../appinputfield/AppInputField";
import { AppFormValidationLabel } from "./AppFormValidationLabel";

export interface AppFormFieldProps {
  fieldTestID?: string;
  validationLabelTestID?: string;
  name: string;
  readOnly?: boolean;
  value?: string;
  labelProps?: AppLabelProps;
  fieldInputProps: AppInputFieldProps;
}

type Props = AppFormFieldProps;

const AppFormField = React.memo<Props>(
  ({
    name,
    value,
    labelProps,
    fieldInputProps,
    fieldTestID,
    validationLabelTestID
  }) => {
    const {
      errors,
      handleChange,
      setFieldTouched,
      touched,
      values
    } = useFormikContext<FormikValues>();

    const theme = usePreferredTheme();

    return (
      <>
        {labelProps && (
          <AppLabel
            style={[
              styles.label,
              { color: theme.themedColors.primaryLabelColor }
            ]}
            {...labelProps}
          />
        )}
        <AppInputField
          testID={fieldTestID}
          value={value ? value : values[name]}
          onChangeText={handleChange(name)}
          onBlur={() => {
            setFieldTouched(name);
          }}
          {...fieldInputProps}
        />
        {errors[name] && touched[name] && (
          <AppFormValidationLabel
            validationLabelTestID={validationLabelTestID}
            errorString={errors[name] as string}
            shouldVisible={true}
          />
        )}
      </>
    );
  }
);

const styles = StyleSheet.create({
  label: {
    paddingBottom: 8.0
  }
});

export default AppFormField;
