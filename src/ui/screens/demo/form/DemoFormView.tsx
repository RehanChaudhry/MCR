import { FormikValues } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Enter an email address")
    .email("Enter a valid email address"),
  password: Yup.string()
    .required("Enter your password")
    .min(8, "Password should be atleast 8 chars")
});

const DemoFormView = ({
  initialValues = { email: "", password: "" },
  onSubmit = (_values: FormikValues) => {}
}) => {
  return (
    <ThemeSwitcher>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <View style={styles.container}>
          <AppFormField
            fieldTestID="emailField"
            validationLabelTestID={"emailValidationLabel"}
            name="email"
            labelProps={{ text: "EMAIL" }}
            fieldInputProps={{
              textContentType: "emailAddress",
              keyboardType: "email-address",
              placeholder: "Enter your email address",
              autoCapitalize: "none"
            }}
          />
          <View style={styles.spacer} />
          <AppFormField
            fieldTestID="passwordField"
            validationLabelTestID="passwordValidationLabel"
            name="password"
            labelProps={{ text: "PASSWORD" }}
            fieldInputProps={{
              textContentType: "password",
              placeholder: "Enter your password",
              secureTextEntry: true
            }}
          />
          <View style={styles.spacer} />
          <AppFormFormSubmit
            testID={"formSubmit"}
            text={"Submit"}
            buttonType={BUTTON_TYPES.NORMAL}
          />
        </View>
      </AppForm>
    </ThemeSwitcher>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 12.0
  },
  spacer: {
    padding: 8
  }
});

export default DemoFormView;
