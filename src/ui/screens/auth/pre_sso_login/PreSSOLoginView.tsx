import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";
import Colors from "config/Colors";
import { ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Logo from "assets/images/logo.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";
import LoginImage from "assets/images/sso_login_pic.svg";
import Lock from "assets/images/lock-closed.svg";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";

type Props = {
  openWelcomeScreen?: () => void;
  goBack?: () => void;
  openForgotPasswordScreen?: () => void;
  shouldShowProgressBar?: boolean;
};

export const PreSSOLoginView = React.memo<Props>(
  ({ goBack, openWelcomeScreen }) => {
    const theme = usePreferredTheme();

    return (
      <Screen>
        <ScrollView>
          <AppImageBackground
            containerShape={CONTAINER_TYPES.CIRCLE}
            icon={() => (
              <ArrowLeft
                width={20}
                height={20}
                fill={theme.themedColors.primary}
              />
            )}
            containerStyle={styles.leftArrow}
            onPress={goBack}
          />

          <Logo style={styles.logo} />

          <View
            style={{
              aspectRatio: 1.36,
              width: "100%"
            }}>
            <LoginImage
              width={"100%"}
              height={"100%"}
              fill="red"
              style={styles.loginImage}
            />
          </View>

          <View style={styles.mainContainer}>
            <HeadingWithText
              headingText={STRINGS.login.signin_to_your_account}
              headingFontWeight={"bold"}
              headingStyle={styles.signInHeading}
              text={STRINGS.preSSOLogin.sso_text}
              textStyle={styles.ssoText}
            />

            <AppLabel
              text={STRINGS.preSSOLogin.sso_second_text}
              numberOfLines={0}
              weight={"bold"}
              style={styles.ssoSecondText}
            />

            <View style={styles.buttonViewStyle}>
              <AppButton
                text={STRINGS.preSSOLogin.signIn_sso}
                buttonStyle={{
                  backgroundColor: theme.themedColors.primary
                }}
                textStyle={{ color: theme.themedColors.background }}
                fontWeight={"semi-bold"}
                leftIcon={() => <Lock width={16} height={16} />}
                onPress={openWelcomeScreen}
              />
            </View>

            <View style={styles.spannableText}>
              <MultilineSpannableText
                text={[STRINGS.login.cant_log, STRINGS.login.contact_us]}
                textStyle={[
                  { fontSize: 14 },
                  { fontSize: 14, color: theme.themedColors.primary }
                ]}
              />
            </View>
          </View>
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    marginTop: SPACE._2xl,
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg
  },
  leftArrow: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: 32,
    height: 32,
    marginTop: SPACE.xl,
    marginLeft: SPACE.lg
  },
  logo: {
    marginTop: SPACE._2xl,
    marginLeft: SPACE.lg
  },
  signInHeading: {
    fontSize: FONT_SIZE.xl,
    marginTop: SPACE._2xl
  },
  email: {
    marginTop: SPACE._2xl
  },
  textFieldStyle: {
    borderWidth: 1
  },
  buttonStyle: {
    height: 44
  },
  spannableText: {
    marginVertical: SPACE._2xl
  },
  ssoSecondText: {
    marginTop: SPACE.xl,
    fontSize: FONT_SIZE.sm
  },
  ssoText: {
    marginTop: SPACE._2xl,
    fontSize: FONT_SIZE.sm
  },
  loginImage: {
    marginTop: SPACE._2xl
  },
  buttonViewStyle: {
    marginTop: SPACE._2xl,
    marginBottom: SPACE.xl
  }
});
