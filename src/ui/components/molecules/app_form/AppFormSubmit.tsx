import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";
import SimpleToast from "react-native-simple-toast";

interface Props extends AppButtonProps {}

export const AppFormFormSubmit = optimizedMemo<Props>(({ ...rest }) => {
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
        if (isValid) {
          handleSubmit();
        } else {
          SimpleToast.show("Please fill all required fields correctly.");
          submitForm().then().catch();
        }
      }}
      {...rest}
    />
  );
});

export default AppFormFormSubmit;
