import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppForm from "ui/components/molecules/app_form/AppForm";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";

type Props = {
  roommateData: FormInputFieldData;
};

const validationSchema = Yup.object().shape({
  frustrated: Yup.object().required("Select one option"),
  upset: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters")
});
let initialValues: FormikValues = {
  frustrated: "",
  upset: ""
};

const onSubmit = (_value: FormikValues) => {
  initialValues = _value;
};
const Agreement: FC<Props> = ({ roommateData }) => {
  const theme = usePreferredTheme();
  return (
    <AppForm
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      <View style={styles.spacer} />

      {roommateData.inputType === "textarea" && (
        <AppFormField
          fieldTestID="upset"
          validationLabelTestID={"upsetValidationLabel"}
          name="upset"
          labelProps={{
            text: roommateData.label,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: roommateData.placeholder,
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
      )}
    </AppForm>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.lg
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  textStyle: {
    marginTop: SPACE.sm,
    color: grayShades.warmGray["300"]
  },
  headingStyle: {
    fontSize: FONT_SIZE.base
  },
  buttonView: {
    marginTop: SPACE.md
  },
  learnMore: {
    fontSize: FONT_SIZE.xs,
    fontWeight: "bold",
    textAlign: "left"
  },
  switchButton: {
    paddingBottom: SPACE.lg
  },

  spacer: {
    paddingBottom: SPACE.lg
  },
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

export default Agreement;
