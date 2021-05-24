import React from "react";
import { useFormikContext } from "formik";
import {
  AppButton,
  AppButtonProps
} from "ui/components/molecules/app_button/AppButton";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { AppLog } from "utils/Util";
import SimpleToast from "react-native-simple-toast";
import {err} from "react-native-svg/lib/typescript/xml";

export const AppFormFormSubmit = optimizedMemo<AppButtonProps>((props) => {
  const { handleSubmit, isValid, errors } = useFormikContext();
  return (
    <AppButton
      onPress={() => {
        AppLog.logForcefully("isValid", JSON.stringify(errors));
        isValid
          ? handleSubmit()
          : SimpleToast.show("Please insert valid values");
      }}
      {...props}
    />
  );
});

export default AppFormFormSubmit;
