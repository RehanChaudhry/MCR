import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config";
import { Linking, StyleSheet, View } from "react-native";
import ProfileHeader from "ui/components/templates/view_profile/ProfileHeader";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import TagList from "ui/components/molecules/tag_list/TagList";
import SocialDetailForm from "ui/components/templates/about_me/SocialDetailForm";
import InstagramDark from "assets/images/instagram_dark_icon.svg";
import FacebookDark from "assets/images/facebook_dark_icon.svg";
import LikedInDark from "assets/images/linkedIN_dark_icon.svg";
import TikTokDark from "assets/images/tiktok_dark_icon.svg";
import SnapchatDark from "assets/images/snapchat_dark_icon.svg";
import TwitterDark from "assets/images/twitter_dark_icon.svg";
import YouTube from "assets/images/youtube_icon_dark.svg";

type CustomViewProfileProps = {
  listData: FormInputFieldData;
};

export const ViewProfileSectionFieldItem = React.memo<CustomViewProfileProps>(
  ({ listData }) => {
    const theme = usePreferredTheme();

    switch (listData.inputType) {
      // case "agreement":
      //   return <AppLabel text={"Agreement"} />;
      case "textarea":
        return (
          <>
            <View style={styles.spacer} />

            <AppLabel
              text={listData.label}
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
                listData.userMeta?.length === 0
                  ? "N/A"
                  : listData.userMeta![0].value
              }
              numberOfLines={0}
              style={{
                fontSize: FONT_SIZE.sm,
                color: grayShades.warmGray["700"]
              }}
            />
            <View style={styles.horizontalLine} />
          </>
        );
      case "dropdown":
        return (
          <>
            <View style={styles.spacer} />
            <HeadingWithText
              headingText={listData.label}
              text={
                listData.userMeta?.length === 0
                  ? "N/A"
                  : listData.userMeta![0].value
              }
              headingFontWeight={"semi-bold"}
              textStyle={styles.textStyle}
              headingStyle={[
                styles.headingStyle,
                { color: theme.themedColors.labelSecondary }
              ]}
            />
          </>
        );
      case "checkbox":
        return (
          <>
            <View style={styles.spacer} />
            <HeadingWithText
              headingText={listData.label}
              text={
                listData.userMeta?.length === 0
                  ? "N/A"
                  : listData.userMeta![0].value
              }
              headingFontWeight={"semi-bold"}
              textStyle={styles.textStyle}
              headingStyle={[
                styles.headingStyle,
                { color: theme.themedColors.labelSecondary }
              ]}
            />
          </>
        );
      case "radio":
        return (
          <>
            <View style={styles.spacer} />
            <HeadingWithText
              headingText={listData.label}
              text={
                listData.userMeta?.length === 0
                  ? "N/A"
                  : listData.userMeta![0].value
              }
              headingFontWeight={"semi-bold"}
              textStyle={styles.textStyle}
              headingStyle={[
                styles.headingStyle,
                { color: theme.themedColors.labelSecondary }
              ]}
            />
          </>
        );
      case "multiselect":
        return (
          <>
            <View style={styles.spacer} />
            <TagList
              labelTitle={listData.label}
              data={listData.userMeta ?? []}
            />
          </>
        );

      case "text":
        return (
          <>
            <View style={styles.spacer} />
            <HeadingWithText
              headingText={listData.label}
              text={
                listData.userMeta?.length === 0
                  ? "N/A"
                  : listData.userMeta![0].value
              }
              headingFontWeight={"semi-bold"}
              textStyle={styles.textStyle}
              headingStyle={[
                styles.headingStyle,
                { color: theme.themedColors.labelSecondary }
              ]}
            />
          </>
        );

      case "url":
        const userMetaLinks =
          listData.userMeta?.length === 0
            ? "N/A"
            : listData.userMeta![0].value;
        const IconTypes = {
          "icon-facebook": FacebookDark,
          "icon-twitter": TwitterDark,
          "icon-linkedin": LikedInDark,
          "icon-instagram": InstagramDark,
          "icon-snapchat": SnapchatDark,
          "icon-tiktok": TikTokDark,
          "icon-youtube": YouTube
        };
        return (
          <>
            <View style={styles.spacer} />
            <SocialDetailForm
              heading={listData.label}
              title={userMetaLinks!}
              headingStyle={{ color: grayShades.warmGray["700"] }}
              onPress={() => {
                // Alert.alert("Facebook profile link is pressed");
                Linking.openURL(userMetaLinks!);
              }}
              icon={() => {
                const MyIcon =
                  // @ts-ignore
                  IconTypes[
                    listData!.icon !== undefined
                      ? listData?.icon.toString()
                      : "icon-facebook"
                  ];

                return <MyIcon testID="icon" width={20} height={20} />;
              }}
            />
          </>
        );

      case "file":
        return (
          <>
            <ProfileHeader
              firstName={listData.firstName}
              lastName={listData.lastName}
            />
          </>
        );

      default:
        return null;
    }
  }
);
const styles = StyleSheet.create({
  space: {
    marginTop: SPACE.sm
  },
  dropDown: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  spacer: {
    paddingTop: SPACE.lg
  },
  aboutMe: { fontSize: FONT_SIZE.xs, paddingBottom: SPACE.sm },
  headingStyle: {
    fontSize: FONT_SIZE.sm
  },
  textStyle: {
    marginTop: SPACE.sm
  },
  horizontalLine: {
    backgroundColor: grayShades.warmGray["300"],
    height: 0.5,
    marginVertical: SPACE.md
  }
});
