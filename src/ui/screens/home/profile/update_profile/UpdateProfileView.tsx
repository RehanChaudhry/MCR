import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { BasicProfile } from "ui/components/templates/basic_profile/BasicProfile";
import { DemoGraphics } from "ui/components/templates/demographics/DemoGraphics";
import { Interests } from "ui/components/templates/interests/interests";
import { LivingDetails } from "ui/components/templates/living_details/LivingDetails";
import { VideoIntroduction } from "ui/components/templates/video_introduction/VideoIntroduction";
import * as Yup from "yup";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { FormikValues } from "formik";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import RightArrow from "assets/images/arrow_circle_right.svg";
import AppForm from "ui/components/molecules/app_form/AppForm";
import { AppLog } from "utils/Util";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
type Props = {
  isUpdating: boolean;
};

const validationSchema = Yup.object().shape({
  //basic profile component
  firstName: Yup.string()
    .required("Enter your first name")
    .min(1, "First name should be atleast 1 characters")
    .max(50, "First name should be less than 50 characters"),
  lastName: Yup.string()
    .required("Enter your last name")
    .min(1, "Last name should be atleast 1 characters")
    .max(50, "Last name should be less than 50 characters"),
  aboutMe: Yup.string().max(
    100,
    "About Me should be less than 100 characters"
  ),
  faceBookProfile: Yup.string().url(
    "Please Provide Valid Facebook profile"
  ),
  twitterProfile: Yup.string().url("Please Provide Twitter  profile"),
  linkedInProfile: Yup.string().url(
    "Please Provide Valid LinkedIn profile"
  ),
  instagramProfile: Yup.string().url(
    "Please Provide Valid Instagram profile"
  ),
  snapChatProfile: Yup.string().url(
    "Please Provide Valid SnapChat profile"
  ),
  tikTokProfile: Yup.string().url("Please Provide Valid TikTok profile"),

  //demo graphics component
  homeTown: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(50, "First name should be less than 50 characters"),
  intendedMajor: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(50, "First name should be less than 50 characters"),
  //gender: Yup.object().required("Please select your gender"),

  //interests components
  // hobbies: Yup.object().required("Select your hobbies"),
  // memberships: Yup.object().required("Select your memberships"),
  // movies: Yup.object().required("Select your movies and tv shows"),
  // music: Yup.object().required("Select your music"),
  // books: Yup.object().required("Select your books"),
  // games: Yup.object().required("Select your games"),

  //living details
  programs: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(100, "First name should be less than 100 characters"),
  community: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(100, "First name should be less than 100 characters"),
  building: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(100, "First name should be less than 100 characters"),
  room: Yup.string()
    .min(1, "First name should be atleast 1 characters")
    .max(100, "First name should be less than 100 characters"),
  //video introduction component
  youtubeVideoUrl: Yup.string().url("Please Provide Valid YouTube URL")
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
