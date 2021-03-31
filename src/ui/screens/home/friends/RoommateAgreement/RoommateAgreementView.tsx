import React, { FC } from "react";
import Screen from "ui/components/atoms/Screen";
import RoommateAgreementTerms from "ui/components/templates/roommate_agreement/RoommateAgreementTerms";
import Agreement from "ui/components/templates/roommate_agreement/Agreement";
import AppForm from "ui/components/molecules/app_form/AppForm";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { AppLog } from "utils/Util";
import { ScrollView, StyleSheet, View } from "react-native";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { SPACE, STRINGS } from "config";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type Props = {};

const validationSchema = Yup.object().shape({
  frustrated: Yup.object().required("Select one option"),
  upset: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  substance: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  temperature: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  comfortable: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  notice: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  support: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters"),
  feel: Yup.string()
    .required("This field is required")
    .min(1, "should be atleast 1 characters")
    .max(50, "should be less than 50 characters")
});
let initialValues: FormikValues = {
  frustrated: "",
  upset: "",
  substance: "",
  temperature: "",
  comfortable: "",
  notice: "",
  support: "",
  feel: ""
};

const onSubmit = (_value: FormikValues) => {
  initialValues = _value;
  AppLog.log("form values" + initialValues);
};

const RoommateAgreementView: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View style={styles.labelViewStyle}>
          <AppLabel
            text={
              "You, Kinslee Fink and Rosa Lawson are the parties of this roommate agreement."
            }
            numberOfLines={0}
          />
        </View>
        <AppForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          <RoommateAgreementTerms />
          <Agreement />
          <View style={styles.buttonViewStyle}>
            <AppFormFormSubmit
              text={STRINGS.profile.buttonText.saveAndContinue}
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
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  labelViewStyle: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg
  },
  buttonViewStyle: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  }
});

export default RoommateAgreementView;
