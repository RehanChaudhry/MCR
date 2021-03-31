import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export const AppFormFormSubmit = optimizedMemo<AppButtonProps>((props) => {
  const { handleSubmit } = useFormikContext();
  return <AppButton onPress={handleSubmit} {...props} />;
});

export default AppFormFormSubmit;
