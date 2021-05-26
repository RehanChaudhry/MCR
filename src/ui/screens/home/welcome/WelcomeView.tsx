import ArrowRight from "assets/images/arrow_circle_right.svg";
import Play from "assets/images/play.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React, { useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { CardView } from "ui/components/atoms/CardView";
import Screen from "ui/components/atoms/Screen";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { HTMLView } from "react-native-htmlview";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StaticContent } from "models/api_responses/StaticContentResponseModel";

type Props = {
  openUpdateProfileScreen: () => void;
  shouldShowProgressBar?: boolean;
  staticContent: StaticContent;
};

export const WelcomeView = React.memo<Props>(
  ({ openUpdateProfileScreen, staticContent }) => {
    const theme = usePreferredTheme();
    const [shouldPlayVideo, setShouldPlayVideo] = useState(false);

    return (
      <Screen>
        <ScrollView>
          <View style={styles.mainContainer}>
            <HeadingWithText
              headingText={STRINGS.welcome.welcome}
              headingFontWeight={"bold"}
              headingStyle={styles.welcomeHeading}
              text={STRINGS.welcome.welcome_text}
              textStyle={styles.text}
            />
            <Image
              source={require("assets/images/video_image.png")}
              resizeMode="cover"
              style={styles.image}
            />
            <View style={styles.buttonViewStyle}>
              <AppButton
                text={STRINGS.welcome.play_video}
                buttonStyle={{
                  backgroundColor: theme.themedColors.primary
                }}
                textStyle={[
                  styles.buttonText,
                  { color: theme.themedColors.background }
                ]}
                fontWeight={"semi-bold"}
                leftIcon={() => (
                  <Play
                    width={16}
                    height={16}
                    fill={theme.themedColors.background}
                  />
                )}
                onPress={() => setShouldPlayVideo(true)}
              />
            </View>

            <HeadingWithText
              headingText={staticContent.title ?? ""}
              headingFontWeight={"bold"}
              headingNumberOfLines={0}
              headingStyle={styles.learnAboutHeading}
              text={staticContent.description ?? ""}
              textStyle={styles.learnAboutText}
            />

            <CardView style={styles.cardView}>
              <View style={styles.cardViewMainContainer}>
                <HTMLView
                  value={staticContent.content}
                  stylesheet={styles}
                />
              </View>
            </CardView>

            <View style={styles.continue}>
              <AppButton
                text={STRINGS.welcome.continue}
                buttonStyle={{
                  backgroundColor: theme.themedColors.primary
                }}
                textStyle={{ color: theme.themedColors.background }}
                fontWeight={"semi-bold"}
                rightIcon={() => (
                  <ArrowRight
                    width={16}
                    height={16}
                    fill={theme.themedColors.background}
                  />
                )}
                onPress={() => {
                  if (shouldPlayVideo) {
                    setShouldPlayVideo(false);
                    openUpdateProfileScreen();
                  } else {
                    openUpdateProfileScreen();
                  }
                }}
              />
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: { marginTop: SPACE.lg, marginHorizontal: SPACE.lg },
  welcomeHeading: {
    fontSize: FONT_SIZE.xl,
    alignSelf: "center"
  },
  text: {
    marginTop: SPACE.sm,
    textAlign: "center",
    fontSize: FONT_SIZE.sm
  },
  buttonViewStyle: {
    marginTop: SPACE.lg
  },
  cardView: {
    marginTop: SPACE.lg
  },
  learnAboutHeading: {
    fontSize: FONT_SIZE.lg,
    marginTop: SPACE._2xl,
    textAlign: "center"
  },
  learnAboutText: {
    marginTop: SPACE.md,
    textAlign: "center",
    fontSize: FONT_SIZE.sm
  },
  cardViewMainContainer: {
    padding: SPACE.lg
  },
  roommate_heading: {
    fontSize: FONT_SIZE.base
  },
  roommate_text: {
    marginTop: SPACE.sm,
    fontSize: FONT_SIZE.sm
  },
  heading: {
    marginTop: SPACE.lg,
    fontSize: FONT_SIZE.base
  },
  textSocialNetworking: {
    marginTop: SPACE.sm,
    fontSize: FONT_SIZE.base
  },
  continue: {
    marginVertical: SPACE.lg
  },
  image: {
    width: "100%",
    height: 200,
    marginTop: SPACE.lg
  },
  buttonText: {
    fontSize: FONT_SIZE.lg
  },
  b: {
    fontSize: FONT_SIZE.lg,
    fontWeight: "bold"
  },
  br: {
    lineHeight: -12
  }
});
