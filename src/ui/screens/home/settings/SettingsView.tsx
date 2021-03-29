import React, { FC } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CardView } from "../../../components/atoms/CardView";
import { SPACE } from "../../../../config";
import AppFormField from "../../../components/molecules/app_form/AppFormField";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";
import AppForm from "../../../components/molecules/app_form/AppForm";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { AppLog } from "../../../../utils/Util";
import Screen from "../../../components/atoms/Screen";
import AppFormFormSubmit from "../../../components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "../../../components/molecules/app_button/AppButton";

type Props = {};

const SettingsView: FC<Props> = () => {
  const validationSchema = Yup.object().shape({
    //basic profile component
    // primaryEmailAddress: Yup.string()
    //   .required("Enter your first name")
    //   .min(3, "First name should be atleast 3 characters")
    //   .max(25, "First name should be less than 26 characters"),
    alternateEmailAddress: Yup.string()
      .required("Enter your alternative")
      .email("Enter a valid email address"),
    currentPassword: Yup.string()
      .required("Enter your current password")
      .min(8, "Password should be atleast 8 chars"),

    //demo graphics component
    newPassword: Yup.string()
      .required("Enter your hometown")
      .required("Enter your new password")
      .min(8, "Password should be atleast 8 chars"),

    confirmPassword: Yup.string()
      .required("Enter your hometown")
      .required("Enter your confirm password")
      .min(8, "Password should be atleast 8 chars")
  });
  let initialValues: FormikValues = {
    // basic profile
    primaryEmailAddress: "",
    alternateEmailAddress: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  };

  const onSubmit = (_value: FormikValues) => {
    initialValues = _value;
    AppLog.log("form values" + initialValues);
  };

  const theme = usePreferredTheme();

  return (
    <Screen>
      <ScrollView>
        <View style={styles.mainContainer}>
          <CardView style={styles.cardStyles}>
            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <AppFormField
                fieldTestID="primaryEmailAddress"
                validationLabelTestID={
                  "primaryEmailAddressValidationLabel"
                }
                name="primaryEmailAddress"
                labelProps={{
                  text: "Primary Email Address",
                  weight: "semi-bold"
                }}
                readOnly={true}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  autoCapitalize: "none",
                  value: "zane.mayes@ohio.edu",
                  style: { color: theme.themedColors.label },
                  shouldDisable: true,
                  placeholderTextColor: theme.themedColors.placeholder,
                  viewStyle: [
                    styles.textFieldStyle,
                    {
                      backgroundColor: theme.themedColors.interface["100"],
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="alternateEmailAddress"
                validationLabelTestID={
                  "alternateEmailAddressValidationLabel"
                }
                name="alternateEmailAddress"
                labelProps={{
                  text: "Alternative Email Address",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Enter your alternative email",
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: { color: theme.themedColors.label },
                  viewStyle: [
                    styles.textFieldStyle,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="currentPassword"
                validationLabelTestID={"currentPasswordValidationLabel"}
                name="currentPassword"
                labelProps={{
                  text: "Current Password",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Enter your current password",
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: { color: theme.themedColors.label },
                  viewStyle: [
                    styles.textFieldStyle,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="newPassword"
                validationLabelTestID={"newPasswordValidationLabel"}
                name="newPassword"
                labelProps={{
                  text: "New Password",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Create your new password",
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: { color: theme.themedColors.label },
                  viewStyle: [
                    styles.textFieldStyle,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="confirmPassword"
                validationLabelTestID={"confirmPasswordValidationLabel"}
                name="confirmPassword"
                labelProps={{
                  text: "Confirm Password",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Re-enter your new password",
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: { color: theme.themedColors.label },
                  viewStyle: [
                    styles.textFieldStyle,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />
              <View style={styles.buttonViewStyle}>
                <AppFormFormSubmit
                  text={"Save"}
                  buttonType={BUTTON_TYPES.NORMAL}
                  fontWeight={"semi-bold"}
                  textStyle={{ color: theme.themedColors.background }}
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: theme.themedColors.primary }
                  ]}
                />
              </View>
            </AppForm>
          </CardView>
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%"
  },
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg
  },
  headingStyle: {
    paddingVertical: SPACE.sm
  },
  horizontalLine: {
    height: 0.5,
    marginVertical: SPACE.lg
  },
  viewFieldStyle: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  spacer: {
    paddingBottom: SPACE.lg
  },
  buttonViewStyle: {
    marginTop: SPACE.lg,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  }
});

export default SettingsView;
