import React from "react";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { CardView } from "ui/components/atoms/CardView";
import { UploadProfilePhoto } from "ui/components/templates/basic_profile/UploadProfilePhoto";
import { SPACE, STRINGS } from "config";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import FacebookIcon from "assets/images/facebook_icon.svg";
import TwitterIcon from "assets/images/twitter_icon.svg";
import LinkedInIcon from "assets/images/linkedin_icon.svg";
import InstagramIcon from "assets/images/instagram_icon.svg";
import SnapChatIcon from "assets/images/snapchat_icon.svg";
import TikTokIcon from "assets/images/tiktok_icon.svg";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export const BasicProfile = optimizedMemo(({}) => {
  const theme = usePreferredTheme();
  const facebookIcon = () => <FacebookIcon width={20} height={20} />;
  const twitterIcon = () => <TwitterIcon width={20} height={20} />;
  const linkedInIcon = () => <LinkedInIcon width={20} height={20} />;
  const instagramIcon = () => <InstagramIcon width={20} height={20} />;
  const snapChatIcon = () => <SnapChatIcon width={20} height={20} />;
  const tikTokIcon = () => <TikTokIcon width={20} height={20} />;
  return (
    <CardView style={styles.cardStyles}>
      <HeadingWithText
        headingText={STRINGS.profile.basicProfile.heading}
        text={STRINGS.profile.basicProfile.title}
        headingFontWeight={"semi-bold"}
        headingStyle={[
          styles.headingStyle,
          { color: theme.themedColors.label }
        ]}
        textStyle={[{ color: theme.themedColors.labelSecondary }]}
      />
      <View style={styles.horizontalLine} />
      <UploadProfilePhoto />
      <AppFormField
        fieldTestID="firstName"
        validationLabelTestID={"firstNameValidationLabel"}
        name="firstName"
        labelProps={{
          text: STRINGS.profile.formTitle.firstName,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.firstName,
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
        fieldTestID="lastName"
        validationLabelTestID={"lastNameValidationLabel"}
        name="lastName"
        labelProps={{
          text: STRINGS.profile.formTitle.lastName,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.lastName,
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
        fieldTestID="aboutMe"
        validationLabelTestID={"aboutMeValidationLabel"}
        name="aboutMe"
        labelProps={{
          text: STRINGS.profile.formTitle.aboutMe,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.aboutMe,
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
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="faceBookProfile"
        validationLabelTestID={"faceBookProfileValidationLabel"}
        name="faceBookProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.faceBookProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.faceBookProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: facebookIcon
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="twitterProfile"
        validationLabelTestID={"twitterProfileValidationLabel"}
        name="twitterProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.twitterProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.twitterProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: twitterIcon
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="linkedInProfile"
        validationLabelTestID={"linkedInProfileValidationLabel"}
        name="linkedInProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.linkedInProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.linkedInProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: linkedInIcon
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="instagramProfile"
        validationLabelTestID={"instagramProfileValidationLabel"}
        name="instagramProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.instagramProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.instagramProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: instagramIcon
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="snapChatProfile"
        validationLabelTestID={"snapChatProfileValidationLabel"}
        name="snapChatProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.snapChatProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.snapChatProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: snapChatIcon
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="tikTokProfile"
        validationLabelTestID={"tikTokProfileValidationLabel"}
        name="tikTokProfile"
        labelProps={{
          text: STRINGS.profile.formTitle.tikTokProfile,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.tikTokProfile,
          autoCapitalize: "none",
          placeholderTextColor: theme.themedColors.placeholder,
          style: { color: theme.themedColors.label },
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.background,
              borderColor: theme.themedColors.border
            }
          ],
          leftIcon: tikTokIcon
        }}
      />
    </CardView>
  );
});

const styles = StyleSheet.create({
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
    paddingVertical: SPACE.sm
  },
  horizontalLine: {
    backgroundColor: grayShades.warmGray["300"],
    height: 0.5,
    marginVertical: SPACE.lg
  },
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg
  },
  aboutMe: {
    height: 80,
    borderWidth: 1,
    paddingVertical: SPACE.xsm
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
