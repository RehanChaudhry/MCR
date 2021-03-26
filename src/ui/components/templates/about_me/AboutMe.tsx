import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
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

import { COLORS, FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";

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
          text={"Watch Video Introduction"}
          buttonStyle={[
            styles.uploadButton,
            { borderColor: theme.themedColors.interface["700"] }
          ]}
          buttonType={BUTTON_TYPES.BORDER}
          textStyle={{
            color: theme.themedColors.label,
            borderColor: theme.themedColors.interface["700"],
            marginHorizontal: SPACE.xsm,
            fontSize: FONT_SIZE.xsm
          }}
          shouldShowError={false}
          fontWeight={"bold"}
          leftIcon={watchVideo}
          shouldAlignTextWithLeftIconWithFullWidth={true}
        />

        <AppLabel
          text={"About Me"}
          style={[
            styles.aboutMe,
            { color: theme.themedColors.labelSecondary }
          ]}
          weight={"semi-bold"}
        />

        <AppLabel
          text={
            "I am a Interior Architecture major who also likes to play the bass guitar. I always clean up after myself and I like having a quiet environment but I'm down to do fun stuff as well! I am kind of introverted but once we get to know each other, I’ll be your best friend."
          }
          numberOfLines={0}
        />
        <View style={styles.horizontalLine} />
        <SocialDetailForm
          icon={facebookIcon}
          heading={"Facebook Profile"}
          title={"facebook.com/zanemayes"}
        />
        <SocialDetailForm
          icon={twitterIcon}
          heading={"Twitter Profile"}
          title={"twitter.com/zanemayes"}
        />
        <SocialDetailForm
          icon={linkedInIcon}
          heading={"LinkedIn Profile"}
          title={"linkedin.com/zanemayes"}
        />
        <SocialDetailForm
          icon={tikTokIcon}
          heading={"TikTok Profile"}
          title={"tiktok.com/zanemayes"}
        />
        <SocialDetailForm
          icon={instagramIcon}
          heading={"Instagram Profile"}
          title={"instagram.com/zanemayes"}
        />
        <SocialDetailForm
          icon={snapchatIcon}
          heading={"SnapChat Profile"}
          title={"snapchat.com/zanemayes"}
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.xsm,
    paddingBottom: SPACE._3xl
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
    //marginBottom: -16
  },
  horizontalLine: {
    backgroundColor: COLORS.grey,
    height: 0.5,
    marginVertical: SPACE.lg
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
    paddingTop: SPACE.xsm,
    fontSize: FONT_SIZE.xsm
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
  aboutMe: { fontSize: FONT_SIZE.xsm, paddingBottom: SPACE.sm }
});

export default AboutMe;
