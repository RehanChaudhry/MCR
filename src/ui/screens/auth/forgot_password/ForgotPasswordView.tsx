import ArrowLeft from "assets/images/arrow_left.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import Colors from "config/Colors";
import Strings from "config/Strings";
import { FormikValues } from "formik";
import { usePreferredTheme } from "hooks";
import { ForgotPasswordApiRequestModel } from "models/api_requests/ForgotPasswordApiRequestModel";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import Screen from "ui/components/atoms/Screen";
import { UniLogo } from "ui/components/atoms/UniLogo";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  openForgotPasswordFeedBackScreen: (email: string) => void;
  shouldShowProgressBar?: boolean;
  openSignInScreen?: () => void;
  onForgotPassword: (request: ForgotPasswordApiRequestModel) => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(Strings.login.enter_valid_email_validation)
    .required(Strings.login.email_required_validation)
});

let initialValues: FormikValues = {
  email: "lfrance11@geocities.jp"
};

export const ForgotPasswordView = React.memo<Props>(
  ({ onForgotPassword, openSignInScreen, shouldShowProgressBar }) => {
    const theme = usePreferredTheme();

    const onSubmit = (_value: FormikValues) => {
      initialValues = _value;
      AppLog.log(() => "form values" + initialValues);
      onForgotPassword({
        email: _value.email
      });
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
                  shouldShowProgressBar={shouldShowProgressBar}
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
