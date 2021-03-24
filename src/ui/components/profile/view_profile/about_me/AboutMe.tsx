import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import SocialDetailForm from "ui/components/profile/view_profile/about_me/SocialDetailForm";
import FacebookIcon from "assets/images/facebook_dark_icon.svg";
import TwitterIcon from "assets/images/twitter_dark_icon.svg";
import LinkedInIcon from "assets/images/linkedIN_dark_icon.svg";
import TikTokIcon from "assets/images/tiktok_dark_icon.svg";
import InstagramIcon from "assets/images/instagram_dark_icon.svg";
import SnapChatIcon from "assets/images/snapchat_dark_icon.svg";
import { COLORS, SPACE } from "config";

type Props = {};

const AboutMe: FC<Props> = () => {
  const facebookIcon = () => <FacebookIcon width={20} height={20} />;
  const twitterIcon = () => <TwitterIcon width={20} height={20} />;
  const linkedInIcon = () => <LinkedInIcon width={20} height={20} />;
  const tikTokIcon = () => <TikTokIcon width={20} height={20} />;
  const instagramIcon = () => <InstagramIcon width={20} height={20} />;
  const snapchatIcon = () => <SnapChatIcon width={20} height={20} />;
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
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
    marginTop: SPACE.xsm
    //marginBottom: -16
  },
  horizontalLine: {
    backgroundColor: COLORS.grey,
    height: 0.5,
    marginVertical: SPACE.lg
  }
});

export default AboutMe;
