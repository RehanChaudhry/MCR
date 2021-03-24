import React from "react";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import LeftArrow from "assets/images/arrow_left.svg";
import { usePreferredTheme } from "hooks";
import Colors from "config/Colors";
import { ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Logo from "assets/images/logo.svg";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";
import LoginImage from "assets/images/forgot_pic.svg";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";

type Props = {
  openForgotPasswordScreen?: () => void;
  shouldShowProgressBar?: boolean;
};

export const ForgotPasswordFeedBackView = React.memo<Props>(({}) => {
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
        />

        <Logo style={styles.logo} />
        <LoginImage
          style={styles.loginImage}
          width={"100%"}
          height={300}
        />
        <View style={styles.mainContainer}>
          <AppLabel
            text={STRINGS.forgotPasswordFeedBack.check_your_inbox}
            weight={"bold"}
            style={styles.signInHeading}
          />

          <MultilineSpannableText
            textStyle={[
              { fontSize: FONT_SIZE.md },
              {
                fontSize: FONT_SIZE.md,
                color: theme.themedColors.primary
              },
              { fontSize: FONT_SIZE.md }
            ]}
            text={[
              {
                id: 1,
                text: STRINGS.forgotPasswordFeedBack.feedBack_one_text
              },
              { id: 2, text: STRINGS.forgotPasswordFeedBack.email },
              {
                id: 3,
                text: STRINGS.forgotPasswordFeedBack.feedBack_third_text
              }
            ]}
          />

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
            textStyle={{ color: theme.themedColors.background }}
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
            textStyle={{ color: theme.themedColors.interface["700"] }}
            fontWeight={"semi-bold"}
            buttonType={BUTTON_TYPES.BORDER}
            leftIcon={() => (
              <LeftArrow
                width={16}
                height={16}
                fill={theme.themedColors.interface["700"]}
              />
            )}
          />
        </View>
      </ScrollView>
    </Screen>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
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
    fontSize: FONT_SIZE._2xl,
    marginTop: SPACE.xl,
    marginBottom: SPACE.xl
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
    marginTop: SPACE.xl,
    marginBottom: SPACE._2xl
  },
  fourthText: {
    marginTop: SPACE.xl,
    fontSize: FONT_SIZE.md
  },
  ssoText: {
    marginTop: SPACE._2xl,
    fontSize: FONT_SIZE.md
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
  }
});
