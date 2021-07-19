import WatchVideo from "assets/images/watch_video_icon.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Colors from "config/Colors";
import Strings from "config/Strings";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { ProfilePicture } from "models/User";
import React, { FC, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import AppVideoPopup from "ui/components/organisms/popup/AppVideoPopup";
import useAuth from "hooks/useAuth";
import EIntBoolean from "models/enums/EIntBoolean";

type Props = {
  firstName: string | undefined;
  lastName: string | undefined;
  profilePicture: ProfilePicture | undefined;
  matchGroupName: string | undefined;
  homeTown: string | undefined;
  youtubeVideoUrl: string | null | undefined;
};

const ProfileHeader: FC<Props> = ({
  firstName,
  lastName,
  profilePicture,
  matchGroupName,
  homeTown,
  youtubeVideoUrl
}) => {
  const theme = usePreferredTheme();
  const [shouldShowVideoDialog, setShouldShowVideoDialog] = useState(
    false
  );
  const watchVideo = () => (
    <WatchVideo height={16} width={16} color={Colors.grey} />
  );

  const { uni } = useAuth();

  const videoDialog = () => (
    <AppVideoPopup
      videoUrl={youtubeVideoUrl!}
      isVisible={shouldShowVideoDialog}
      title={STRINGS.roommateAgreement.roommate_agreement_text}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Do you agree with the terms and conditions of this roommate agreement?`}
      actions={[
        {
          title: "Cancel",
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {
            setShouldShowVideoDialog(false);
          }
        }
      ]}
    />
  );

  return (
    <View>
      <View style={styles.container}>
        <View>
          {uni?.socialFeedFeature === EIntBoolean.TRUE ? (
            <Image
              source={
                profilePicture?.fileURL
                  ? { uri: profilePicture?.fileURL }
                  : require("assets/images/profile.png")
              }
              style={styles.image}
            />
          ) : (
            <Image
              source={require("assets/images/profile.png")}
              style={styles.image}
            />
          )}
        </View>
        <View style={styles.headingTextStyle}>
          <HeadingWithText
            headingText={firstName + " " + lastName}
            headingFontWeight={"semi-bold"}
            text={
              matchGroupName + (homeTown ? "," + homeTown : "") !== "null"
                ? matchGroupName + (homeTown ? "," + homeTown : "")
                : Strings.common.not_available
            }
            textStyle={[
              styles.textStyle,
              { color: theme.themedColors.interface["600"] }
            ]}
          />
        </View>
      </View>
      {youtubeVideoUrl !== null && youtubeVideoUrl !== undefined && (
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
          fontWeight={"semi-bold"}
          onPress={() => setShouldShowVideoDialog(true)}
        />
      )}
      {videoDialog()}
    </View>
  );
};

const styles = StyleSheet.create({
  headingTextStyle: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: SPACE.md
  },
  textStyle: {
    paddingTop: SPACE.xs,
    fontSize: FONT_SIZE.md
  },
  container: {
    flexDirection: "row"
  },
  uploadButton: {
    height: 44,
    marginTop: SPACE.lg,
    width: "100%",
    flexDirection: "row",
    paddingLeft: SPACE.sm
    //alignItems: "flex-start"
  },
  image: {
    height: 55,
    width: 55,
    borderRadius: 55 / 2,
    marginTop: 5,
    overflow: "hidden"
  },
  dialogButtonStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.base
  },
  dialogTitleStyle: { fontSize: FONT_SIZE.base, textAlign: "center" },
  dialogMessageStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" }
});

export default ProfileHeader;
