import React, { FC } from "react";
import { Image, Linking, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import Strings from "config/Strings";
import Colors from "config/Colors";
import WatchVideo from "assets/images/watch_video_icon.svg";
import { ProfilePicture } from "models/User";
import SimpleToast from "react-native-simple-toast";

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
  const watchVideo = () => (
    <WatchVideo height={16} width={16} color={Colors.grey} />
  );

  return (
    <View>
      <View style={styles.container}>
        <View>
          <Image
            source={
              profilePicture?.fileURL
                ? { uri: profilePicture?.fileURL }
                : require("assets/images/profile.png")
            }
            style={styles.image}
          />
        </View>
        <View style={styles.headingTextStyle}>
          <HeadingWithText
            headingText={firstName + " " + lastName}
            headingFontWeight={"semi-bold"}
            text={matchGroupName + (homeTown ? "," + homeTown : "")}
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
        fontWeight={"semi-bold"}
        onPress={() =>
          youtubeVideoUrl !== null && youtubeVideoUrl !== undefined
            ? Linking.openURL(youtubeVideoUrl!)
            : SimpleToast.show(Strings.invalid_video)
        }
      />
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
  }
});

export default ProfileHeader;
