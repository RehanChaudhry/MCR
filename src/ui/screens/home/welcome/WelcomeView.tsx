import ArrowRight from "assets/images/arrow_circle_right.svg";
import Play from "assets/images/play.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { CardView } from "ui/components/atoms/CardView";
import Screen from "ui/components/atoms/Screen";
import {
  URL_TYPES,
  WebViewComponent
} from "ui/components/atoms/webview/WebViewComponent";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";

type Props = {
  openForgotPasswordScreen?: () => void;
  shouldShowProgressBar?: boolean;
};

export const WelcomeView = React.memo<Props>(({}) => {
  const theme = usePreferredTheme();

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
          <View style={styles.webView}>
            <WebViewComponent
              url={"https://www.youtube.com/watch?v=zWh3CShX_do"}
              urlType={URL_TYPES.LINK}
            />
            <View style={styles.buttonViewStyle}>
              <AppButton
                text={STRINGS.welcome.play_video}
                buttonStyle={{
                  backgroundColor: theme.themedColors.primary
                }}
                textStyle={{ color: theme.themedColors.background }}
                fontWeight={"semi-bold"}
                leftIcon={() => (
                  <Play
                    width={16}
                    height={16}
                    fill={theme.themedColors.background}
                  />
                )}
              />
            </View>

            <HeadingWithText
              headingText={STRINGS.welcome.learn_about_heading}
              headingFontWeight={"bold"}
              headingStyle={styles.learnAboutHeading}
              text={STRINGS.welcome.learn_about_text}
              textStyle={styles.learnAboutText}
            />

            <CardView style={styles.cardView}>
              <View style={styles.cardViewMainContainer}>
                <HeadingWithText
                  headingText={STRINGS.welcome.roommate_selection_heading}
                  headingFontWeight={"bold"}
                  headingStyle={styles.roommate_heading}
                  text={STRINGS.welcome.roommate_selection}
                  textStyle={styles.roommate_text}
                />

                <HeadingWithText
                  headingText={STRINGS.welcome.socail_network_heading}
                  headingFontWeight={"bold"}
                  headingStyle={styles.heading}
                  text={STRINGS.welcome.socail_network_text}
                  textStyle={styles.roommate_text}
                />

                <HeadingWithText
                  headingText={STRINGS.welcome.roommate_designer}
                  headingFontWeight={"bold"}
                  headingStyle={styles.heading}
                  text={STRINGS.welcome.roommate_designer_text}
                  textStyle={styles.roommate_text}
                />
                <HeadingWithText
                  headingText={STRINGS.welcome.accurate_matches}
                  headingFontWeight={"bold"}
                  headingStyle={styles.heading}
                  text={STRINGS.welcome.accurate_matches_text}
                  textStyle={styles.roommate_text}
                />
                <HeadingWithText
                  headingText={STRINGS.welcome.friends_messages}
                  headingFontWeight={"bold"}
                  headingStyle={styles.heading}
                  text={STRINGS.welcome.friends_messages_text}
                  textStyle={styles.roommate_text}
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
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
});

const styles = StyleSheet.create({
  mainContainer: { marginTop: SPACE.lg },
  welcomeHeading: {
    fontSize: FONT_SIZE._2xl,
    alignSelf: "center"
  },
  text: {
    marginTop: SPACE.lg,
    textAlign: "center",
    fontSize: FONT_SIZE.md
  },
  webView: {
    marginLeft: SPACE.md,
    marginRight: SPACE.md
  },
  buttonViewStyle: {
    marginTop: SPACE.xl
  },
  cardView: {
    marginTop: SPACE.lg
  },
  learnAboutHeading: {
    fontSize: FONT_SIZE.xl,
    marginTop: SPACE.lg,
    textAlign: "center"
  },
  learnAboutText: {
    marginTop: SPACE.lg,
    textAlign: "center",
    fontSize: FONT_SIZE.md
  },
  cardViewMainContainer: {
    padding: SPACE.md
  },
  roommate_heading: {
    fontSize: FONT_SIZE.xl
  },
  roommate_text: {
    marginTop: SPACE.sm,
    fontSize: FONT_SIZE.md
  },
  heading: {
    marginTop: SPACE.lg,
    fontSize: FONT_SIZE.xl
  },
  textSocialNetworking: {
    marginTop: SPACE.sm,
    fontSize: FONT_SIZE.md
  },
  continue: {
    marginTop: SPACE.xl,
    marginBottom: SPACE.xl
  }
});