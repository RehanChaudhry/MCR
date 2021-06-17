import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";

export const AppFormFormSubmit = optimizedMemo<AppButtonProps>((props) => {
  const {
    handleSubmit,
    isValid,
    submitForm,
    errors,
    values
  } = useFormikContext();
  return (
    <AppButton
      onPress={() => {
        AppLog.log(() => "Values: " + JSON.stringify(values));
        AppLog.log(() => "Errors: " + JSON.stringify(errors));
        isValid ? handleSubmit() : submitForm();
      }}
      {...props}
    />
  );
});

export default AppFormFormSubmit;
