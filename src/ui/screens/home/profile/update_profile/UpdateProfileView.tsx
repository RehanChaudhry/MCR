import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BasicProfile } from "ui/components/profile/update_profile/basic_profile/BasicProfile";
import { DemoGraphics } from "ui/components/profile/update_profile/demographics/DemoGraphics";
import { Interests } from "ui/components/profile/update_profile/interests/interests";
import { LivingDetails } from "ui/components/profile/update_profile/living_details/LivingDetails";
import { VideoIntroduction } from "ui/components/profile/update_profile/video_introduction/VideoIntroduction";
import * as Yup from "yup";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { FormikValues } from "formik";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import RightArrow from "assets/images/arrow_circle_right.svg";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { AppLog } from "utils/Util";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
type Props = {};

const validationSchema = Yup.object().shape({
  //basic profile component
  firstName: Yup.string()
    .required("Enter your first name")
    .min(3, "First name should be atleast 3 characters")
    .max(25, "First name should be less than 26 characters"),
  lastName: Yup.string()
    .required("Enter your last name")
    .min(3, "Last name should be atleast 3 characters")
    .max(25, "Last name should be less than 26 characters"),
  aboutMe: Yup.string()
    .required("Enter your profile description")
    .min(3, "About Me should be atleast 25 characters")
    .max(25, "Last name should be less than 50 characters"),
  // faceBookProfile: Yup.string().required("Enter your facebook profile"),
  // twitterProfile: Yup.string().required("Enter your twitter profile"),
  // linkedInProfile: Yup.string().required("Enter your linkedin profile"),
  // instagramProfile: Yup.string().required("Enter your instagram profile"),
  // snapChatProfile: Yup.string().required("Enter your snapchat profile"),
  // tikTokProfile: Yup.string().required("Enter your tiktok profile"),

  //demo graphics component
  homeTown: Yup.string()
    .required("Enter your hometown")
    .min(3, "Home Town should be atleast 3 characters")
    .max(25, "Home Town should be less than 26 characters"),
  intendedMajor: Yup.string()
    .required("Enter your intended major")
    .min(3, "Intended Major should be atleast 3 characters")
    .max(25, "Intended Major should be less than 26 characters"),
  gender: Yup.object().required("Please select your gender"),

  //interests components
  hobbies: Yup.object().required("Select your hobbies"),
  memberships: Yup.object().required("Select your memberships"),
  movies: Yup.object().required("Select your movies and tv shows"),
  music: Yup.object().required("Select your music"),
  books: Yup.object().required("Select your books"),
  games: Yup.object().required("Select your games"),

  //living details
  programs: Yup.string()
    .required("Enter your educational program")
    .min(3, "Programs should be atleast 3 characters")
    .max(25, "Programs should be less than 26 characters"),
  community: Yup.string()
    .required("Enter your community")
    .min(3, "Community should be atleast 3 characters")
    .max(25, "Community should be less than 26 characters"),
  building: Yup.string()
    .required("Enter your building information")
    .min(3, "Building should be atleast 3 characters")
    .max(25, "Building should be less than 26 characters"),
  room: Yup.string()
    .required("Enter your room number")
    .min(3, "Room should be atleast 3 characters")
    .max(25, "Room should be less than 26 characters"),

  //video introduction component
  youtubeVideoUrl: Yup.string().required("Enter youtube video url")
});
let initialValues: FormikValues = {
  // basic profile
  firstName: "",
  lastName: "",
  aboutMe: "",
  faceBookProfile: "",
  twitterProfile: "",
  linkedInProfile: "",
  instagramProfile: "",
  snapChatProfile: "",
  tikTokProfile: "",

  //demographics component
  homeTown: "",
  intendedMajor: "",
  gender: "",

  //interests component
  hobbies: "",
  memberships: "",
  movies: "",
  music: "",
  books: "",
  games: "",

  //living details component
  programs: "",
  community: "",
  building: "",
  room: "",

  //video introduction component
  youtubeVideoUrl: ""
};

const onSubmit = (_value: FormikValues) => {
  initialValues = _value;
  AppLog.log("form values" + initialValues);
};

export const UpdateProfileView: React.FC<Props> = () => {
  const theme = usePreferredTheme();
  const rightArrowIcon = () => <RightArrow width={20} height={20} />;
  return (
    <ScrollView>
      <AppForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        <View style={styles.headingView}>
          <HeadingWithText
            headingText={""}
            text={STRINGS.profile.title}
            textStyle={[
              styles.textStyle,
              { color: theme.themedColors.label }
            ]}
          />
        </View>
        <BasicProfile />
        <DemoGraphics />
        <Interests />
        <LivingDetails />
        <VideoIntroduction />
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
            rightIcon={rightArrowIcon}
            iconStyle={styles.iconStyle}
          />
        </View>
      </AppForm>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  buttonViewStyle: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  },
  iconStyle: {
    marginRight: SPACE.lg
  },
  headingView: {
    paddingHorizontal: SPACE.lg,
    paddingTop: SPACE.lg
  },
  textStyle: {
    textAlign: "center"
  }
});
