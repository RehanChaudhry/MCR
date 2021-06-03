import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import UserImage from "assets/images/user_pic2.svg";
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

type Props = {
  firstName: string | undefined;
  lastName: string | undefined;
};

const ProfileHeader: FC<Props> = ({ firstName, lastName }) => {
  const theme = usePreferredTheme();
  const watchVideo = () => (
    <WatchVideo height={16} width={16} color={Colors.grey} />
  );

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.imageView}>
          <UserImage />
        </View>
        <View style={styles.headingTextStyle}>
          <HeadingWithText
            headingText={firstName + " " + lastName}
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
    </View>
  );
};

const styles = StyleSheet.create({
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
    flexDirection: "row"
  },
  uploadButton: {
    height: 44,
    marginVertical: SPACE.lg,
    width: "100%",
    flexDirection: "row",
    paddingLeft: SPACE.sm
    //alignItems: "flex-start"
  }
});

export default ProfileHeader;
