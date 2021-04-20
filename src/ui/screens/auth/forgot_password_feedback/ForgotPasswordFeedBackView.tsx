import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import LeftArrow from "assets/images/arrow_left.svg";
import { useAuth, usePreferredTheme } from "hooks";
import Colors from "config/Colors";
import { Image, ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { moderateScale } from "config/Dimens";

type Props = {
  openForgotPasswordScreen?: () => void;
  openSignInScreen: () => void;
  shouldShowProgressBar?: boolean;
};

export const ForgotPasswordFeedBackView = React.memo<Props>(
  ({ openForgotPasswordScreen, openSignInScreen }) => {
    const theme = usePreferredTheme();
    const auth = useAuth();

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
            onPress={openForgotPasswordScreen}
          />

          <Image
            source={{
              uri: auth?.uni?.mainLogo?.fileURL
            }}
            resizeMode="stretch"
            style={styles.logo}
          />

          <Image
            source={require("assets/images/forgot_pic.png")}
            resizeMode="cover"
            style={styles.loginImage}
          />

          <View style={styles.mainContainer}>
            <AppLabel
              text={STRINGS.forgotPasswordFeedBack.check_your_inbox}
              weight={"bold"}
              style={styles.signInHeading}
            />

            <View style={styles.spannableText}>
              <MultilineSpannableText
                appLabelProps={[
                  { style: { fontSize: FONT_SIZE.sm } },
                  {
                    style: {
                      fontSize: FONT_SIZE.sm,
                      color: theme.themedColors.primary
                    }
                  },
                  { style: { fontSize: FONT_SIZE.sm } }
                ]}
                text={[
                  STRINGS.forgotPasswordFeedBack.feedBack_one_text,
                  STRINGS.forgotPasswordFeedBack.email,
                  STRINGS.forgotPasswordFeedBack.feedBack_third_text
                ]}
              />
            </View>

            <AppLabel
              text={STRINGS.forgotPasswordFeedBack.feedBack_fourth_text}
              numberOfLines={0}
              style={styles.fourthText}
            />

            <AppButton
              text={STRINGS.forgotPasswordFeedBack.did_not_recieve_email}
              buttonStyle={[
                styles.recieveEmail,
                { backgroundColor: theme.themedColors.primary }
              ]}
              textStyle={[
                styles.signInText,
                { color: theme.themedColors.background }
              ]}
              fontWeight={"semi-bold"}
            />

            <AppButton
              text={STRINGS.forgotPasswordFeedBack.go_back_signin}
              buttonStyle={[
                styles.goBackSignIn,
                {
                  backgroundColor: theme.themedColors.background
                }
              ]}
              textStyle={[
                styles.signInText,
                { color: theme.themedColors.interface["700"] }
              ]}
              fontWeight={"semi-bold"}
              buttonType={BUTTON_TYPES.BORDER}
              leftIcon={() => (
                <LeftArrow
                  width={20}
                  height={20}
                  fill={theme.themedColors.interface["700"]}
                />
              )}
              onPress={openSignInScreen}
            />
          </View>
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    marginLeft: SPACE.lg,
    marginRight: SPACE.lg,
    marginTop: SPACE.xl
  },
  leftArrow: {
    backgroundColor: Colors.white,
    elevation: 2,
    width: 32,
    height: 32,
    marginLeft: SPACE.lg
  },
  logo: {
    width: moderateScale(200),
    height: moderateScale(53),
    marginTop: SPACE._2xl,
    marginLeft: SPACE.lg
  },
  signInHeading: {
    fontSize: FONT_SIZE._2xl,
    marginTop: SPACE._2xl
  },
  email: {
    marginTop: SPACE._2xl
  },
  textFieldStyle: {
    borderWidth: 1
  },
  recieveEmail: {
    marginTop: SPACE._2xl
  },
  spannableText: {
    marginTop: SPACE._2xl
  },
  fourthText: {
    marginTop: SPACE.xl,
    fontSize: FONT_SIZE.sm
  },
  ssoText: {
    marginTop: SPACE._2xl,
    fontSize: FONT_SIZE.xs
  },
  loginImage: {
    marginTop: SPACE._2xl
  },
  buttonViewStyle: {
    marginTop: SPACE._2xl,
    marginBottom: SPACE.xl
  },
  goBackSignIn: {
    marginTop: SPACE.xl,
    marginBottom: SPACE.xl
  },
  signInText: {
    fontSize: moderateScale(15.0)
  }
});
