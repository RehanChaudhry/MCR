import React from "react";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import { StyleSheet } from "react-native";
import { SPACE } from "config";

type Props = {
  label: string;
  placeHolder: string;
};

export const DynamicAppFormField = React.memo<Props>(
  ({ label, placeHolder }) => {
    const theme = usePreferredTheme();
    return (
      <AppFormField
        fieldTestID="upset"
        validationLabelTestID={"upsetValidationLabel"}
        name="upset"
        labelProps={{
          text: label,
          weight: "semi-bold",
          numberOfLines: 0
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: placeHolder,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          viewStyle: [
            styles.aboutMe,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          style: [
            styles.inputFieldRow,
            {
              color: theme.themedColors.label
            }
          ],
          multiline: true,
          textAlignVertical: "top"
        }}
      />
    );
  }
);

const styles = StyleSheet.create({
  textFieldStyle: {
    borderWidth: 1
  },
  aboutMe: {
    height: 80,
    borderWidth: 1,
    paddingVertical: SPACE.xs
  },
  inputFieldRow: {
    flex: 1
  }
});
