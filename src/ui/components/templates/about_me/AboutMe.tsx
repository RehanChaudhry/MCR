import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import SocialDetailForm from "ui/components/templates/about_me/SocialDetailForm";
import FacebookIcon from "assets/images/facebook_dark_icon.svg";
import TwitterIcon from "assets/images/twitter_dark_icon.svg";
import LinkedInIcon from "assets/images/linkedIN_dark_icon.svg";
import TikTokIcon from "assets/images/tiktok_dark_icon.svg";
import InstagramIcon from "assets/images/instagram_dark_icon.svg";
import SnapChatIcon from "assets/images/snapchat_dark_icon.svg";
import UserImage from "assets/images/user_pic2.svg";
import WatchVideo from "assets/images/watch_video_icon.svg";

import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import Strings from "config/Strings";

type Props = {};

const AboutMe: FC<Props> = () => {
  const theme = usePreferredTheme();
  const facebookIcon = () => <FacebookIcon width={20} height={20} />;
  const twitterIcon = () => <TwitterIcon width={20} height={20} />;
  const linkedInIcon = () => <LinkedInIcon width={20} height={20} />;
  const tikTokIcon = () => <TikTokIcon width={20} height={20} />;
  const instagramIcon = () => <InstagramIcon width={20} height={20} />;
  const snapchatIcon = () => <SnapChatIcon width={20} height={20} />;
  const watchVideo = () => (
    <WatchVideo height={16} width={16} color={Colors.grey} />
  );

  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <View style={styles.container}>
          <View style={styles.imageView}>
            <UserImage />
          </View>
          <View style={styles.headingTextStyle}>
            <HeadingWithText
              headingText={"Zane Mayes"}
              headingFontWeight={"semi-bold"}
              text={"Freshman, Interior Architecture"}
              textStyle={[
                styles.textStyle,
                { color: theme.themedColors.interface["600"] }
              ]}
            />
          </View>
        </View>
        <AppButton
          text={Strings.profile.viewProfile.videoIntroduction}
          buttonStyle={[
            styles.uploadButton,
            { borderColor: theme.themedColors.interface["700"] }
          ]}
          buttonType={BUTTON_TYPES.BORDER}
          textStyle={{
            color: theme.themedColors.label,
            borderColor: theme.themedColors.interface["700"],
            marginHorizontal: SPACE.xs,
            fontSize: FONT_SIZE.md
          }}
          shouldShowError={false}
          //fontWeight={"bold"}
          leftIcon={watchVideo}
          shouldAlignTextWithLeftIconWithFullWidth={true}
          fontWeight={"semi_bold"}
        />

        <AppLabel
          text={Strings.profile.formTitle.aboutMe}
          style={[
            styles.aboutMe,
            {
              color: theme.themedColors.labelSecondary,
              fontSize: FONT_SIZE.md
            }
          ]}
          weight={"semi-bold"}
        />

        <AppLabel
          text={
            "I am a Interior Architecture major who also likes to play the bass guitar. I always clean up after myself and I like having a quiet environment but I'm down to do fun stuff as well! I am kind of introverted but once we get to know each other, I’ll be your best friend."
          }
          numberOfLines={0}
          style={{
            fontSize: FONT_SIZE.sm,
            color: grayShades.warmGray["700"]
          }}
        />
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.innerCardView}>
        <SocialDetailForm
          icon={facebookIcon}
          heading={Strings.profile.formTitle.faceBookProfile}
          title={"facebook.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            // Alert.alert("Facebook profile link is pressed");
            Linking.openURL("fb://profile/426253597411506");
          }}
        />
        <SocialDetailForm
          icon={twitterIcon}
          heading={Strings.profile.formTitle.twitterProfile}
          title={"twitter.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            Alert.alert("Twitter profile link is pressed");
          }}
        />
        <SocialDetailForm
          icon={linkedInIcon}
          heading={Strings.profile.formTitle.linkedInProfile}
          title={"linkedin.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            Alert.alert("LinkedIn profile link is pressed");
          }}
        />
        <SocialDetailForm
          icon={tikTokIcon}
          heading={Strings.profile.formTitle.tikTokProfile}
          title={"tiktok.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            Alert.alert("TikTok profile link is pressed");
          }}
        />
        <SocialDetailForm
          icon={instagramIcon}
          heading={Strings.profile.formTitle.instagramProfile}
          title={"instagram.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            Alert.alert("Instagram profile link is pressed");
          }}
        />
        <SocialDetailForm
          icon={snapchatIcon}
          heading={Strings.profile.formTitle.snapChatProfile}
          title={"snapchat.com/zanemayes"}
          headingStyle={{ color: grayShades.warmGray["700"] }}
          onPress={() => {
            Alert.alert("SnapChat profile link is pressed");
          }}
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.xs
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
    //marginBottom: -16
  },
  horizontalLine: {
    backgroundColor: grayShades.warmGray["300"],
    height: 0.5,
    marginVertical: SPACE.md
  },
  imageView: {
    height: 64,
    width: 64,
    borderRadius: SPACE._3xl
  },
  headingTextStyle: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SPACE.lg
  },
  textStyle: {
    paddingTop: SPACE.xs,
    fontSize: FONT_SIZE.md
  },
  container: {
    flexDirection: "row",
    paddingTop: SPACE.lg
  },
  uploadButton: {
    height: 44,
    marginVertical: SPACE.lg,
    width: "100%",
    flexDirection: "row",
    paddingLeft: SPACE.sm
    //alignItems: "flex-start"
  },
  aboutMe: { fontSize: FONT_SIZE.xs, paddingBottom: SPACE.sm }
});

export default AboutMe;
