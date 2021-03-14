import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";

export const AppFormFormSubmit = React.memo<AppButtonProps>((props) => {
  const { handleSubmit } = useFormikContext();
  return <AppButton onPress={handleSubmit} {...props} />;
});

export default AppFormFormSubmit;
