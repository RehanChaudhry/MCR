import React from "react";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { ScrollView, StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "../atoms/CardView";
import Screen from "../atoms/Screen";
import { UploadProfilePhoto } from "./UploadProfilePhoto";
import { COLORS } from "config";
import * as Yup from "yup";
import { FormikValues } from "formik";
import AppForm from "../molecules/app_form/AppForm";
import AppFormField from "../molecules/app_form/AppFormField";

//forms validation
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name"),
  lastName: Yup.string().required("Enter your last name"),
  aboutMe: Yup.string().required("Enter your profile description"),
  faceBookProfile: Yup.string().required("Enter your facebook profile"),
  twitterProfile: Yup.string().required("Enter your twitter profile"),
  linkedInProfile: Yup.string().required("Enter your linkedin profile"),
  instagramProfile: Yup.string().required("Enter your instagram profile"),
  snapChatProfile: Yup.string().required("Enter your snapchat profile"),
  tikTokProfile: Yup.string().required("Enter your tiktok profile")
});

export const BasicProfile = React.memo(
  ({
    initialValues = {
      firstName: "",
      lastName: "",
      aboutMe: "",
      faceBookProfile: "",
      twitterProfile: "",
      linkedInProfile: "",
      instagramProfile: "",
      snapChatProfile: "",
      tikTokProfile: ""
    },
    onSubmit = (_values: FormikValues) => {}
  }) => {
    const theme = usePreferredTheme();
    return (
      <Screen>
        <ScrollView>
          <CardView style={styles.cardStyles}>
            <HeadingWithText
              headingText={"Basic Profile"}
              text={
                "This information will be displayed publicly so be careful what you share."
              }
              headingStyle={[
                styles.headingStyle,
                { color: theme.themedColors.primaryLabelColor }
              ]}
              textStyle={[
                styles.textStyle,
                { color: theme.themedColors.primaryLabelColor }
              ]}
            />
            <View style={styles.horizontalLine} />
            <UploadProfilePhoto />
            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <AppFormField
                fieldTestID="firstName"
                validationLabelTestID={"firstNameValidationLabel"}
                name="firstName"
                labelProps={{ text: "First Name" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Zain",
                  //value: "Zain",
                  autoCapitalize: "none"
                }}
              />
              <AppFormField
                fieldTestID="lastName"
                validationLabelTestID={"lastNameValidationLabel"}
                name="lastName"
                labelProps={{ text: "Last Name" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Chaudhry",
                  autoCapitalize: "none"
                }}
              />
              <AppFormField
                fieldTestID="aboutMe"
                validationLabelTestID={"aboutMeValidationLabel"}
                name="aboutMe"
                labelProps={{ text: "About Me" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Brief Description Of Your Profile",
                  autoCapitalize: "none",
                  viewStyle: [
                    styles.aboutMe,
                    {
                      backgroundColor:
                        theme.themedColors.primaryBackground,
                      borderColor: theme.themedColors.tertiaryLabelColor
                    }
                  ],
                  style: [
                    styles.inputFieldRow,
                    {
                      color: theme.themedColors.primaryLabelColor
                    }
                  ],
                  multiline: true,
                  textAlignVertical: "top"
                }}
              />
              <AppFormField
                fieldTestID="lastName"
                validationLabelTestID={"lastNameValidationLabel"}
                name="lastName"
                labelProps={{ text: "Last Name" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Chaudhry",
                  autoCapitalize: "none"
                }}
              />
            </AppForm>
          </CardView>
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  headingStyle: {
    paddingHorizontal: 8,
    paddingVertical: 12
  },
  textStyle: {
    paddingHorizontal: 8
  },
  horizontalLine: {
    backgroundColor: COLORS.grey,
    height: 0.3,
    marginVertical: 16
  },
  cardStyles: {
    margin: 12,
    padding: 8
  },
  aboutMe: {
    height: 100,
    borderWidth: 1
  },
  inputFieldRow: {
    flex: 1
  }
});
