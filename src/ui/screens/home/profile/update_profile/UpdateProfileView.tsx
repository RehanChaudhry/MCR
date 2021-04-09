import React from "react";
import { StyleSheet, View } from "react-native";
import { DemoGraphics } from "ui/components/templates/demographics/DemoGraphics";
import { Interests } from "ui/components/templates/interests/Interests";
import { LivingDetails } from "ui/components/templates/living_details/LivingDetails";
import { VideoIntroduction } from "ui/components/templates/video_introduction/VideoIntroduction";
import * as Yup from "yup";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { FormikValues } from "formik";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import RightArrow from "assets/images/arrow_circle_right.svg";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BasicProfile } from "ui/components/templates/basic_profile/BasicProfile";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AppLog } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE_LINE_HEIGHT } from "config/Dimens";

type Props = {
  openUpdateQuestionnaireScreen: () => void;
  infoTextShown: boolean;
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
let initialValues = {
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
  hobbies: [],
  memberships: [],
  movies: [],
  music: [],
  books: [],
  games: [],

  //living details component
  programs: "",
  community: "",
  building: "",
  room: "",

  //video introduction component
  youtubeVideoUrl: ""
};

export type UpdateProfileFormKeys = typeof initialValues;

export const UpdateProfileView: React.FC<Props> = ({
  openUpdateQuestionnaireScreen,
  infoTextShown
}) => {
  const theme = usePreferredTheme();
  const rightArrowIcon = () => <RightArrow width={20} height={20} />;
  const onSubmit = (_value: FormikValues) => {
    AppLog.logForcefully("FormikValues: " + JSON.stringify(_value));
    openUpdateQuestionnaireScreen();
  };

  // const [scrollPosition, setScrollPosition] = useState(0);
  // let scrollRef: any;
  // const navigation = useNavigation();
  // navigation.addListener("focus", () => {
  //   // To prevent FlatList scrolls to top automatically,
  //   // we have to delay scroll to the original position
  //   setTimeout(() => {
  //     AppLog.logForcefully(
  //       "scrollRef?.current?.scrollToPosition" +
  //         JSON.stringify(scrollRef?.current?.scrollToPosition)
  //     );
  //     scrollRef?.current?.scrollToPosition(scrollPosition, false);
  //   }, 500);
  // });
  // const handleScroll = (event: any) => {
  //   setScrollPosition(event.nativeEvent.contentOffset.y);
  // };

  return (
    <KeyboardAwareScrollView keyboardOpeningTime={50} extraHeight={200}>
      <AppForm
        initialValues={initialValues}
        validateOnMount={false}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {infoTextShown && (
          <AppLabel
            text={
              "This information will be help us to find better roommate match for you."
            }
            numberOfLines={0}
            style={styles.topText}
          />
        )}
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
    </KeyboardAwareScrollView>
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
  },
  topText: {
    paddingHorizontal: SPACE._2xl,
    paddingTop: SPACE.md,
    textAlign: "center",
    lineHeight: FONT_SIZE_LINE_HEIGHT.sm
  }
});
