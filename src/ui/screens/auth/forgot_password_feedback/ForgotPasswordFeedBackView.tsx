import LeftArrow from "assets/images/arrow_left.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Colors from "config/Colors";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import Screen from "ui/components/atoms/Screen";
import { UniImage } from "ui/components/atoms/UniImage";
import { UniLogo } from "ui/components/atoms/UniLogo";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLog } from "utils/Util";

type Props = {
  openForgotPasswordScreen?: () => void;
  openSignInScreen: () => void;
  shouldShowProgressBar?: boolean;
  email: string;
  onClickedOnTryAgain: () => void;
};

export const ForgotPasswordFeedBackView = React.memo<Props>(
  ({
    openSignInScreen,
    email,
    onClickedOnTryAgain,
    shouldShowProgressBar
  }) => {
    const theme = usePreferredTheme();

    return (
      <Screen>
        <ScrollView>
          <UniLogo style={styles.logo} />

          <UniImage />

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
                  email + " ",
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
              shouldShowProgressBar={shouldShowProgressBar}
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
              onPress={() => {
                AppLog.logForcefully(() => "clciked");
                onClickedOnTryAgain();
              }}
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
  },
  logo: {
    marginLeft: SPACE.lg
  }
});
