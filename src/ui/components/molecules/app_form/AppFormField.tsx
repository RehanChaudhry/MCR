import { FormikValues, useFormikContext } from "formik";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import {
  AppInputField,
  AppInputFieldProps
} from "../appinputfield/AppInputField";
import { AppFormValidationLabel } from "./AppFormValidationLabel";
import { FONT_SIZE, SPACE } from "../../../../config";
import { TouchableOpacity } from "react-native-gesture-handler";

export interface AppFormFieldProps {
  fieldTestID?: string;
  validationLabelTestID?: string;
  name: string;
  readOnly?: boolean;
  value?: string;
  labelProps?: AppLabelProps;
  fieldInputProps: AppInputFieldProps;
  linkLabelProps?: AppLabelProps;
  linkLabelOnPress?: () => void;
}

type Props = AppFormFieldProps;

const AppFormField = React.memo<Props>(
  ({
    name,
    value,
    labelProps,
    fieldInputProps,
    fieldTestID,
    validationLabelTestID,
    linkLabelProps,
    linkLabelOnPress
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
          <View style={styles.linkLabelContainer}>
            <AppLabel
              style={[styles.label, { color: theme.themedColors.label }]}
              {...labelProps}
            />
            <View style={styles.space} />

            {linkLabelProps && (
              <TouchableOpacity onPress={linkLabelOnPress}>
                <AppLabel
                  style={[
                    styles.linkLabel,
                    { color: theme.themedColors.primary }
                  ]}
                  {...linkLabelProps}
                />
              </TouchableOpacity>
            )}
          </View>
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
    paddingBottom: SPACE.xsm
  },
  space: {
    flex: 1
  },
  linkLabelContainer: {
    flexDirection: "row"
  },
  linkLabel: {
    fontSize: FONT_SIZE.xsm
  }
});

export default AppFormField;
