import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";
import Colors from "config/Colors";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";
import Lock from "assets/images/lock-closed.svg";
import { UniImage } from "ui/components/atoms/UniImage";
import { UniLogo } from "ui/components/atoms/UniLogo";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { AppLog } from "utils/Util";
import { TouchableWithoutFeedback } from "react-native";

type Props = {
  openSSOLoginScreen?: () => void;
  goBack?: () => void;
  openForgotPasswordScreen?: () => void;
  openLoginScreen: () => void;
  shouldShowProgressBar?: boolean;
};

export const PreSSOLoginView = React.memo<Props>(
  ({ goBack, openSSOLoginScreen, openLoginScreen }) => {
    const theme = usePreferredTheme();

    let patternArray: string[] = [];

    const createPattern = (positionStyle: ViewStyle, name: string) => {
      return (
        <TouchableWithoutFeedback
          onPress={() => {
            if (name === "bottomLeft") {
              patternArray = [];
            }
            patternArray.splice(patternArray.length, 0, name);
            if (
              name === "bottomRight" &&
              patternArray.length === 3 &&
              patternArray[0] === "bottomLeft" &&
              patternArray[1] === "topCenter" &&
              patternArray[2] === "bottomRight"
            ) {
              //navigate to login
              AppLog.logForcefully(() => "navigate to login");
              openLoginScreen();
            }
          }}>
          <View style={[styles.patternContainer, positionStyle]} />
        </TouchableWithoutFeedback>
      );
    };
    return (
      <Screen
        style={[
          styles.container,
          { backgroundColor: theme.themedColors.backgroundSecondary }
        ]}
        topSafeAreaAndStatusBarColor={
          theme.themedColors.backgroundSecondary
        }>
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

          <UniLogo style={styles.logo} />

          <UniImage />

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
                onPress={openSSOLoginScreen}
              />
            </View>

            <View style={styles.spannableText}>
              <MultilineSpannableText
                text={[STRINGS.login.cant_log, STRINGS.login.contact_us]}
                appLabelProps={[
                  { style: { fontSize: 14 } },
                  {
                    style: {
                      fontSize: 14,
                      color: theme.themedColors.primary
                    }
                  }
                ]}
              />
            </View>
          </View>

          {createPattern(
            {
              alignSelf: "center",
              justifyContent: "center"
            },
            "topCenter"
          )}
          {createPattern({ bottom: 15 }, "bottomLeft")}
          {createPattern({ bottom: 15, right: 0 }, "bottomRight")}
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1
  },
  mainContainer: {
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg
  },
  leftArrow: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: 32,
    height: 32,
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
    marginVertical: SPACE.xl
  },
  ssoSecondText: {
    marginTop: SPACE.xl,
    fontSize: FONT_SIZE.sm
  },
  ssoText: {
    marginTop: SPACE.xl,
    fontSize: FONT_SIZE.sm
  },
  buttonViewStyle: {
    marginTop: SPACE._2xl
  },
  logo: {
    marginLeft: SPACE.lg
  },
  patternContainer: {
    position: "absolute",
    width: 60,
    height: 60
  }
});
