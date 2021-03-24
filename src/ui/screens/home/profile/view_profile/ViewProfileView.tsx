import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ProfileHeader } from "ui/components/profile/view_profile/ProfileHeader";
import Screen from "ui/components/atoms/Screen";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import WatchVideo from "assets/images/watch_video_icon.svg";
import Colors from "config/Colors";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import AboutMe from "../../../../components/profile/view_profile/about_me/AboutMe";

type Props = {};

export const ViewProfileView: React.FC<Props> = () => {
  const theme = usePreferredTheme();
  const watchVideo = () => (
    <WatchVideo height={12} width={12} color={Colors.grey} />
  );

  return (
    <Screen>
      <ScrollView>
        <View style={styles.mainContainer}>
          <View style={styles.headerContainer}>
            <ProfileHeader />
            <AppButton
              text={STRINGS.profile.buttonText.uploadProfilePhoto}
              buttonStyle={[
                styles.uploadButton,
                { borderColor: theme.themedColors.interface["700"] }
              ]}
              buttonType={BUTTON_TYPES.BORDER}
              textStyle={{
                color: theme.themedColors.label,
                borderColor: theme.themedColors.interface["700"],
                marginHorizontal: 32
              }}
              shouldShowError={false}
              fontWeight={"semi-bold"}
              leftIcon={watchVideo}
            />
            <AppLabel
              text={"About Me"}
              style={[
                styles.aboutMe,
                { color: theme.themedColors.labelSecondary }
              ]}
              weight={"semi-bold"}
            />
          </View>
          <AboutMe />
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    marginVertical: SPACE.lg
  },
  headerContainer: {
    marginHorizontal: SPACE._3xl
  },
  aboutMe: { fontSize: FONT_SIZE.md },
  uploadButton: {
    height: 44,
    marginVertical: SPACE.lg,
    width: "100%",
    flexDirection: "row"
    //alignItems: "flex-start"
  }
});
