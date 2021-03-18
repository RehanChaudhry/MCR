import React, { useState } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";
import { AppFormDropDown } from "../../molecules/app_form_dropdown/AppFormDropDown";
import { AppFormRadioButton } from "../../molecules/app_form_radio_buttons/AppFormRadioButton";
import { DIRECTION_TYPE } from "../../atoms/radio_group/RadioGroup";
import AppFormField from "../../molecules/app_form/AppFormField";
import * as Yup from "yup";
import { FormikValues } from "formik";
import AppForm from "../../molecules/app_form/AppForm";

//forms validation
const validationSchema = Yup.object().shape({
  homeTown: Yup.string().required("Enter your hometown"),
  intendedMajor: Yup.string().required("Enter your intended major")
});

export const DemoGraphics = React.memo(
  ({
    // @ts-ignore
    initialValues = {
      homeTown: "",
      intendedMajor: ""
    },
    // @ts-ignore
    onSubmit = (_values: FormikValues) => {}
  }) => {
    const theme = usePreferredTheme();
    const [title, setTitle] = useState("Select your gender");
    return (
      <CardView style={styles.cardStyles}>
        <HeadingWithText
          headingText={"Demographics"}
          text={"Please take a moment to tell us more about you."}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.label }
          ]}
          textStyle={[{ color: theme.themedColors.labelSecondary }]}
        />
        <View
          style={[
            styles.horizontalLine,
            { backgroundColor: theme.themedColors.interface["700"] }
          ]}
        />

        <AppFormDropDown
          labelProps={{ text: "Gender", weight: "semi-bold" }}
          appDropDownProps={{
            title: title,
            items: [
              { id: "0", title: "Male" },
              { id: "1", title: "Female" },
              { id: "2", title: "Other" }
            ],
            selectedItemCallback: (item) => {
              setTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />

        <AppFormRadioButton
          labelProps={{ text: "Smoking Habits", weight: "semi-bold" }}
          radioData={[
            { id: 1, label: "never" },
            { id: 2, label: "Occasionally" },
            { id: 3, label: "Frequently" }
          ]}
          direction={DIRECTION_TYPE.HORIZONTAL}
        />
        <View style={styles.spacer} />
        <AppForm
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}>
          <AppFormField
            fieldTestID="homeTown"
            validationLabelTestID={"homeTownValidationLabel"}
            name="homeTown"
            labelProps={{ text: "Hometown", weight: "semi-bold" }}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: "Enter your hometown",
              autoCapitalize: "none",
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
            fieldTestID="intendedMajor"
            validationLabelTestID={"intendedMajorValidationLabel"}
            name="intendedMajor"
            labelProps={{ text: "Intended Major", weight: "semi-bold" }}
            fieldInputProps={{
              textContentType: "name",
              keyboardType: "default",
              returnKeyType: "next",
              placeholder: "Enter your intended major",
              autoCapitalize: "none",
              viewStyle: [
                styles.textFieldStyle,
                {
                  backgroundColor: theme.themedColors.background,
                  borderColor: theme.themedColors.border
                }
              ]
            }}
          />
        </AppForm>
      </CardView>
    );
  }
);

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
