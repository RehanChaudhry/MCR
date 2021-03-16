import React from "react";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { ScrollView, StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "../atoms/CardView";
import Screen from "../atoms/Screen";
import { UploadProfilePhoto } from "./UploadProfilePhoto";
import { COLORS, SPACE } from "config";
import * as Yup from "yup";
import { FormikValues } from "formik";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "../molecules/app_form/AppFormField";
import FacebookIcon from "assets/images/facebook_icon.svg";
import TwitterIcon from "assets/images/twitter_icon.svg";
import LinkedInIcon from "assets/images/linkedin_icon.svg";
import InstagramIcon from "assets/images/instagram_icon.svg";
import SnapChatIcon from "assets/images/snapchat_icon.svg";
import TikTokIcon from "assets/images/tiktok_icon.svg";

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
    // @ts-ignore
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
    // @ts-ignore

    onSubmit = (_values: FormikValues) => {}
  }) => {
    const theme = usePreferredTheme();
    const facebookIcon = () => <FacebookIcon width={20} height={20} />;
    const twitterIcon = () => <TwitterIcon width={20} height={20} />;
    const linkedInIcon = () => <LinkedInIcon width={20} height={20} />;
    const instagramIcon = () => <InstagramIcon width={20} height={20} />;
    const snapChatIcon = () => <SnapChatIcon width={20} height={20} />;
    const tikTokIcon = () => <TikTokIcon width={20} height={20} />;
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
              textStyle={[{ color: theme.themedColors.primaryLabelColor }]}
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
                labelProps={{ text: "First Name", weight: "semi-bold" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Zain",
                  autoCapitalize: "none",
                  viewStyle: styles.textFieldStyle
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="lastName"
                validationLabelTestID={"lastNameValidationLabel"}
                name="lastName"
                labelProps={{ text: "Last Name", weight: "semi-bold" }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "Chaudhry",
                  autoCapitalize: "none",
                  viewStyle: styles.textFieldStyle
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="aboutMe"
                validationLabelTestID={"aboutMeValidationLabel"}
                name="aboutMe"
                labelProps={{
                  text: "About Me",
                  weight: "semi-bold"
                }}
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
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="faceBookProfile"
                validationLabelTestID={"faceBookProfileValidationLabel"}
                name="faceBookProfile"
                labelProps={{
                  text: "Facebook Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "facebook.com/",
                  autoCapitalize: "none",
                  leftIcon: facebookIcon
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="twitterProfile"
                validationLabelTestID={"twitterProfileValidationLabel"}
                name="twitterProfile"
                labelProps={{
                  text: "Twitter Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "twitter.com/",
                  autoCapitalize: "none",
                  leftIcon: twitterIcon
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="linkedInProfile"
                validationLabelTestID={"linkedInProfileValidationLabel"}
                name="linkedInProfile"
                labelProps={{
                  text: "Linkedin Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "linkedin.com/",
                  autoCapitalize: "none",
                  leftIcon: linkedInIcon
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="instagramProfile"
                validationLabelTestID={"instagramProfileValidationLabel"}
                name="instagramProfile"
                labelProps={{
                  text: "Instagram Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "instagram.com/",
                  autoCapitalize: "none",
                  leftIcon: instagramIcon
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="snapChatProfile"
                validationLabelTestID={"snapChatProfileValidationLabel"}
                name="snapChatProfile"
                labelProps={{
                  text: "SnapChat Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "snapchat.com/",
                  autoCapitalize: "none",
                  leftIcon: snapChatIcon
                }}
              />
              <View style={styles.spacer} />
              <AppFormField
                fieldTestID="tikTokProfile"
                validationLabelTestID={"tikTokProfileValidationLabel"}
                name="tikTokProfile"
                labelProps={{
                  text: "TikTok Profile",
                  weight: "semi-bold"
                }}
                fieldInputProps={{
                  textContentType: "name",
                  keyboardType: "default",
                  returnKeyType: "next",
                  placeholder: "tiktok.com/",
                  autoCapitalize: "none",
                  leftIcon: tikTokIcon
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
    // paddingHorizontal: SPACE.sm,
    paddingVertical: SPACE.sm
  },
  horizontalLine: {
    backgroundColor: COLORS.grey,
    height: 0.3,
    marginVertical: SPACE.lg
  },
  cardStyles: {
    margin: SPACE.lg,
    padding: SPACE.lg
  },
  aboutMe: {
    height: 80,
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  inputFieldRow: {
    flex: 1
  },
  spacer: {
    paddingBottom: SPACE.lg
  }
});
