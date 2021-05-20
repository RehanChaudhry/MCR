import { SPACE } from "config";
import { FormikValues } from "formik";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { UpdateAccountPasswordApiRequestModel } from "models/api_requests/UpdateAccountPasswordApiRequestModel";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CardView } from "ui/components/atoms/CardView";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  onUpdateAccountSettings: (
    request: UpdateAccountPasswordApiRequestModel
  ) => void;
  shouldShowProgressBar?: boolean;
};

export const SettingsView = React.memo<Props>(
  ({ onUpdateAccountSettings }) => {
    const validationSchema = Yup.object().shape({
      //basic profile component
      // primaryEmailAddress: Yup.string()
      //   .required("Enter your first name")
      //   .min(3, "First name should be atleast 3 characters")
      //   .max(25, "First name should be less than 26 characters"),
      alternateEmailAddress: Yup.string().email(
        "Please provide valid email address"
      ),

      newPassword: Yup.string()
        .matches(/[A-Z]/, "Password must contain one capital letter (A-Z)")
        .matches(/[0-9]/, "Password must contain one number (0-9)")
        .min(8, "Password should be atleast 8 chars")
        .optional(),

      confirmPassword: Yup.string().when("newPassword", {
        is: (value: string) => value?.length > 0,
        then: Yup.string()
          .oneOf(
            [Yup.ref("newPassword")],
            "The passwords you entered do not match"
          )
          .required("Field is required")
      }),

      currentPassword: Yup.string()
        .optional()
        .min(8, "Password should be atleast 8 chars")
        .when("newPassword", {
          is: (value: any[]) => {
            return value?.length > 0;
          },
          then: Yup.string().required("Field is required")
        })
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
      AppLog.log("form values" + initialValues);
      onUpdateAccountSettings({
        secondaryEmail: _value.alternateEmailAddress,
        oldPassword: _value.currentPassword,
        password: _value.newPassword,
        confirmPassword: _value.confirmPassword
      });
    };

    const theme = usePreferredTheme();

    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
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
                  textContentType: "password",
                  keyboardType: "default",
                  returnKeyType: "next",
                  secureTextEntry: true,
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
                  secureTextEntry: true,
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
                  secureTextEntry: true,
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
      </KeyboardAwareScrollView>
    );
  }
);

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
