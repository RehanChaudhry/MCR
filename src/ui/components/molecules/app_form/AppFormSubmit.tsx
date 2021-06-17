import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import SimpleToast from "react-native-simple-toast";

interface Props extends AppButtonProps {
  showErrorToast?: boolean;
}

export const AppFormFormSubmit = optimizedMemo<Props>(
  ({ showErrorToast = true, ...rest }) => {
    const { handleSubmit, isValid } = useFormikContext();
    return (
      <AppButton
        onPress={() => {
          isValid
            ? handleSubmit()
            : showErrorToast
            ? SimpleToast.show("Please insert valid values")
            : {};
        }}
        {...rest}
      />
    );
  }
);

export default AppFormFormSubmit;
