import { SPACE } from "config";
import { FormikValues } from "formik";
import { useAuth } from "hooks";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { UpdateProfileRequestModel } from "models/api_requests/UpdateProfileRequestModel";
import EIntBoolean from "models/enums/EIntBoolean";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { CardView } from "ui/components/atoms/CardView";
import ListItemSeparator from "ui/components/atoms/ListItemSeparator";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  onUpdateAccountSettings: (request: UpdateProfileRequestModel) => void;
  shouldShowProgressBar?: boolean;
};

export const SettingsView = React.memo<Props>(
  ({ onUpdateAccountSettings, shouldShowProgressBar }) => {
    const auth = useAuth();
    const [secEmail, setSecEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
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
        .min(8, "Password should be at least 8 characters")
        .optional(),

      confirmPassword: Yup.string().when("newPassword", {
        is: (value: string) => value?.length > 0,
        then: Yup.string()
          .oneOf(
            [Yup.ref("newPassword")],
            "New Password and Confirm Password do not match"
          )
          .required("Field is required")
      }),

      currentPassword: Yup.string()
        .optional()
        .min(8, "Password should be atleast 8 chars")
        .when(["newPassword"], {
          is: (valueNewPassword: any[]) => {
            return valueNewPassword?.length > 0;
          },
          then: Yup.string().required("Old Password field cannot be empty")
        })
    });
    let initialValues: FormikValues = {
      // basic profile
      primaryEmailAddress: "",
      alternateEmailAddress: auth.user?.profile?.secondaryEmail,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    };

    function shouldDisable() {
      let disable: boolean = false;
      disable = !(
        secEmail !== "" ||
        oldPassword !== "" ||
        newPassword !== "" ||
        conPassword !== ""
      );
      AppLog.log(disable);
      return disable;
    }

    const onSubmit = (_value: FormikValues) => {
      AppLog.log("form values" + JSON.stringify(_value));
      const request: UpdateProfileRequestModel = {};
      if (secEmail !== "") {
        request.secondaryEmail = secEmail;
      }
      if (oldPassword !== "" && newPassword !== "" && conPassword !== "") {
        request.currentPassword = oldPassword;
        request.newPassword = newPassword;
        request.confirmPassword = conPassword;
      }
      AppLog.log("form values request" + JSON.stringify(request));
      onUpdateAccountSettings(request);
    };

    const theme = usePreferredTheme();

    return (
      <KeyboardAwareScrollView style={styles.mainContainer}>
        <View style={styles.mainContainer}>
          <AppForm
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}>
            <CardView style={styles.cardStyles}>
              <View style={styles.leftRightSpacing}>
                <AppFormField
                  isLocked={EIntBoolean.TRUE}
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
                    editable: false,
                    selectTextOnFocus: false,
                    textContentType: "name",
                    keyboardType: "default",
                    returnKeyType: "next",
                    autoCapitalize: "none",
                    value: auth.user?.profile?.email,
                    style: { color: theme.themedColors.label },
                    shouldDisable: true,
                    placeholderTextColor: theme.themedColors.placeholder,
                    viewStyle: [
                      styles.textFieldStyle,
                      {
                        backgroundColor:
                          theme.themedColors.interface["100"],
                        borderColor: theme.themedColors.border
                      }
                    ]
                  }}
                />
              </View>
              <View style={styles.spacer} />
              <View style={styles.leftRightSpacing}>
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
                  value={secEmail}
                  customTextChanged={setSecEmail}
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
              </View>
              <View style={styles.spacer} />
              <ListItemSeparator />
              <View style={styles.spacer} />
              <View style={styles.leftRightSpacing}>
                <AppFormField
                  fieldTestID="currentPassword"
                  validationLabelTestID={"currentPasswordValidationLabel"}
                  name="currentPassword"
                  labelProps={{
                    text: "Current Password",
                    weight: "semi-bold"
                  }}
                  value={oldPassword}
                  customTextChanged={setOldPassword}
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
              </View>
              <View style={styles.spacer} />
              <View style={styles.leftRightSpacing}>
                <AppFormField
                  fieldTestID="newPassword"
                  validationLabelTestID={"newPasswordValidationLabel"}
                  name="newPassword"
                  labelProps={{
                    text: "New Password",
                    weight: "semi-bold"
                  }}
                  value={newPassword}
                  customTextChanged={setNewPassword}
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
              </View>
              <View style={styles.spacer} />
              <View style={styles.leftRightSpacing}>
                <AppFormField
                  fieldTestID="confirmPassword"
                  validationLabelTestID={"confirmPasswordValidationLabel"}
                  name="confirmPassword"
                  labelProps={{
                    text: "Confirm Password",
                    weight: "semi-bold"
                  }}
                  value={conPassword}
                  customTextChanged={setConPassword}
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
              </View>
            </CardView>
            <View style={styles.buttonViewStyle}>
              <AppFormFormSubmit
                loaderColor={theme.themedColors.background}
                shouldShowProgressBar={shouldShowProgressBar}
                isDisable={shouldDisable()}
                text={"Save"}
                buttonType={BUTTON_TYPES.NORMAL}
                fontWeight={"semi-bold"}
                textStyle={{ color: theme.themedColors.interface[100] }}
                textDisableStyle={{ color: theme.themedColors.primary }}
                buttonStyle={[
                  styles.buttonStyle,
                  {
                    backgroundColor: theme.themedColors.primary
                  }
                ]}
                buttonDisableStyle={[
                  styles.buttonStyle,
                  { backgroundColor: theme.themedColors.interface[200] }
                ]}
              />
            </View>
          </AppForm>
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
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.lg
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
    marginBottom: SPACE.xl,
    padding: SPACE.lg
  },
  buttonStyle: {
    height: 44
  },
  leftRightSpacing: {
    paddingRight: SPACE.lg,
    paddingLeft: SPACE.lg
  }
});

export default SettingsView;
