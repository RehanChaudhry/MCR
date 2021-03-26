import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { CardView } from "../../../components/atoms/CardView";
import { SPACE } from "../../../../config";
import AppFormField from "../../../components/molecules/app_form/AppFormField";
import usePreferredTheme from "../../../../hooks/theme/usePreferredTheme";

type Props = {};

const SettingsView: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
      <AppFormField
        fieldTestID="primaryEmailAddress"
        validationLabelTestID={"primaryEmailAddressValidationLabel"}
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
        validationLabelTestID={"alternateEmailAddressValidationLabel"}
        name="alternateEmailAddress"
        labelProps={{
          text: "Alternative Email Address",
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: "zane.mayes@gmail.com",
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
    </CardView>
  );
};

const styles = StyleSheet.create({
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg
  },
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
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
  }
});

export default SettingsView;
