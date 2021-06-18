import { FONT_SIZE, SPACE } from "config";
import { FormikValues, useFormikContext } from "formik";
import { usePreferredTheme } from "hooks";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  AppLabel,
  AppLabelProps
} from "ui/components/atoms/app_label/AppLabel";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import {
  AppInputField,
  AppInputFieldProps
} from "../appinputfield/AppInputField";
import { AppFormValidationLabel } from "./AppFormValidationLabel";
import EIntBoolean from "models/enums/EIntBoolean";

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
  secureTextEntry?: boolean;
  shouldNotOptimize?: boolean;
  customTextChanged?: (value: string) => void;
  isLocked?: EIntBoolean;
}

type Props = AppFormFieldProps;

const AppFormField = optimizedMemo<Props>(
  ({
    name,
    labelProps,
    fieldInputProps,
    fieldTestID,
    validationLabelTestID,
    linkLabelProps,
    linkLabelOnPress,
    secureTextEntry,
    customTextChanged,
    isLocked = EIntBoolean.FALSE
  }) => {
    const theme = usePreferredTheme();

    const {
      errors,
      setFieldTouched,
      setFieldValue,
      touched,
      initialValues
    } = useFormikContext<FormikValues>();

    const _setFieldTouched = useCallback(() => setFieldTouched(name), [
      setFieldTouched,
      name
    ]);

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
              <TouchableOpacity
                onPress={linkLabelOnPress}
                style={styles.linkLabelClick}>
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
          valueToShowAtStart={initialValues[name]}
          onChangeText={(text) => {
            setFieldValue(name, text);
            _setFieldTouched();
            customTextChanged?.(text);
          }}
          onBlur={_setFieldTouched}
          secureTextEntry={secureTextEntry}
          {...fieldInputProps}
          editable={!isLocked}
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
    paddingBottom: SPACE.xs
  },
  space: {
    flex: 1
  },
  linkLabelContainer: {
    flexDirection: "row"
  },
  linkLabel: {
    fontSize: FONT_SIZE.sm
  },
  linkLabelClick: {
    paddingTop: SPACE._2xs
  }
});

export default AppFormField;
