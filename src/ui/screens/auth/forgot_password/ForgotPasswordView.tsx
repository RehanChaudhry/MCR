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
import { UniLogo } from "ui/components/atoms/UniLogo";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { AppLog } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";

type Props = {
  openForgotPasswordFeedBackScreen: () => void;
  shouldShowProgressBar?: boolean;
  openSignInScreen?: () => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Enter your email address")
});

let initialValues: FormikValues = {
  email: "john.doe@gmail.com"
};

export const ForgotPasswordView = React.memo<Props>(
  ({ openForgotPasswordFeedBackScreen, openSignInScreen }) => {
    const theme = usePreferredTheme();

    const onSubmit = (_value: FormikValues) => {
      initialValues = _value;
      AppLog.logForComplexMessages(() => "form values" + initialValues);
      openForgotPasswordFeedBackScreen();
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
          <View style={styles.mainContainer}>
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
              onPress={openSignInScreen}
            />

            <UniLogo />

            <HeadingWithText
              headingText={STRINGS.forgotpassword.forgot_your_password}
              headingFontWeight={"bold"}
              headingStyle={styles.forgotPasswordHeading}
              text={STRINGS.forgotpassword.forgot_text}
              textStyle={styles.forgotText}
            />

            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <View style={styles.email}>
                <AppFormField
                  fieldTestID="email"
                  validationLabelTestID={"emailValidationLabel"}
                  name="email"
                  labelProps={{
                    text: STRINGS.login.email_address,
                    weight: "semi-bold"
                  }}
                  fieldInputProps={{
                    textContentType: "emailAddress",
                    keyboardType: "email-address",
                    returnKeyType: "done",
                    placeholder: STRINGS.login.enter_your_email,
                    autoCapitalize: "none",
                    placeholderTextColor: theme.themedColors.placeholder,
                    style: { color: theme.themedColors.label },
                    viewStyle: [
                      styles.textFieldStyle,
                      {
                        backgroundColor: theme.themedColors.background,
                        borderColor: theme.themedColors.border
                      }
                    ]
                  }}
                />
              </View>

              <View style={styles.buttonViewStyle}>
                <AppFormFormSubmit
                  text={STRINGS.forgotpassword.reset_password}
                  buttonType={BUTTON_TYPES.NORMAL}
                  fontWeight={"semi-bold"}
                  textStyle={[
                    styles.buttonText,
                    { color: theme.themedColors.background }
                  ]}
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: theme.themedColors.primary }
                  ]}
                />
              </View>
            </AppForm>
          </View>
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
    height: 32
  },
  forgotPasswordHeading: {
    fontSize: FONT_SIZE.xl,
    marginTop: SPACE._3xl
  },
  email: {
    marginTop: SPACE._2xl
  },
  textFieldStyle: {
    borderWidth: 1
  },
  buttonViewStyle: {
    marginTop: SPACE._2xl,
    marginBottom: SPACE.xl
  },
  buttonStyle: {
    height: 44
  },
  spannableText: {
    marginTop: SPACE.xl
  },
  forgotText: {
    marginTop: SPACE._2xl,
    fontSize: FONT_SIZE.sm
  },
  buttonText: {
    fontSize: FONT_SIZE.base
  }
});
