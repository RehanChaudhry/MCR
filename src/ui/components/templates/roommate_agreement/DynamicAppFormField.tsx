import React from "react";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import { StyleSheet } from "react-native";
import { SPACE } from "config";
import EIntBoolean from "models/enums/EIntBoolean";

type Props = {
  label: string | undefined;
  placeHolder: string | undefined;
  name: string;
  isLocked: EIntBoolean;
};

export const DynamicAppFormField = React.memo<Props>(
  ({ label, placeHolder, name, isLocked = EIntBoolean.FALSE }) => {
    const theme = usePreferredTheme();
    return (
      <AppFormField
        fieldTestID="upset"
        validationLabelTestID={"upsetValidationLabel"}
        name={name}
        isLocked={isLocked}
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
              backgroundColor: !isLocked
                ? theme.themedColors.background
                : theme.themedColors.primary,
              borderColor: !isLocked
                ? theme.themedColors.border
                : theme.themedColors.borderSecondary
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
