import { SignInApiRequestModel } from "models/api_requests/SignInApiRequestModel";
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
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { UniLogo } from "ui/components/atoms/UniLogo";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { AppLog, loginRegx } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import Strings from "config/Strings";

type Props = {
  openUniSelectionScreen: () => void;
  openForgotPasswordScreen?: () => void;
  onLogin: (request: SignInApiRequestModel) => void;
  shouldShowProgressBar?: boolean;
  openContactUsScreen: () => void;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email(Strings.login.enter_valid_email_validation)
    .required(Strings.login.email_required_validation),
  password: Yup.string()
    .required(Strings.login.pass_required_validation)
    .min(8, Strings.login.min_pass_vaidation)
    .matches(loginRegx, Strings.login.pass_validation)
});

let initialValues: FormikValues = {
  email: "",
  password: ""
};

export const LoginView = React.memo<Props>(
  ({
    openForgotPasswordScreen,
    onLogin,
    openUniSelectionScreen,
    shouldShowProgressBar,
    openContactUsScreen
  }) => {
    const theme = usePreferredTheme();

    const onSubmit = (_value: FormikValues) => {
      AppLog.log(() => "form values" + initialValues);
      onLogin({
        email: _value.email,
        password: _value.password,
        remember: 1,
        roleTitle: "Student"
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
              onPress={openUniSelectionScreen}
            />

            <UniLogo />

            <AppLabel
              text={STRINGS.login.signin_to_your_account}
              weight={"bold"}
              style={styles.signInHeading}
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
                    returnKeyType: "next",
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

              <View style={styles.password}>
                <AppFormField
                  fieldTestID="password"
                  validationLabelTestID={"passwordValidationLabel"}
                  name="password"
                  labelProps={{
                    text: STRINGS.login.password,
                    weight: "semi-bold"
                  }}
                  secureTextEntry={true}
                  linkLabelProps={{
                    text: STRINGS.login.forgot_password
                  }}
                  linkLabelOnPress={openForgotPasswordScreen}
                  fieldInputProps={{
                    textContentType: "password",
                    keyboardType: "default",
                    returnKeyType: "done",
                    placeholder: STRINGS.login.enter_your_pass,
                    autoCapitalize: "none",
                    placeholderTextColor: theme.themedColors.placeholder,
                    style: [{ color: theme.themedColors.label }],
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
                  text={STRINGS.login.sign_in}
                  buttonType={BUTTON_TYPES.NORMAL}
                  fontWeight={"semi-bold"}
                  shouldShowProgressBar={shouldShowProgressBar}
                  textStyle={[
                    styles.signInButtonText,
                    { color: theme.themedColors.background }
                  ]}
                  buttonStyle={[
                    styles.buttonStyle,
                    { backgroundColor: theme.themedColors.primary }
                  ]}
                />
              </View>
            </AppForm>

            <View style={styles.spannableText}>
              <AppLabel
                text={Strings.login.cant_log}
                style={styles.cantLog}
              />
              <AppLabel
                text={Strings.contact_us.contact_us}
                weight={"semi-bold"}
                shouldNotOptimize={false}
                style={[
                  styles.contactUs,
                  { color: theme.themedColors.primary }
                ]}
                onPress={openContactUsScreen}
              />
            </View>
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
  signInHeading: {
    fontSize: FONT_SIZE.xl,
    marginTop: SPACE._3xl
  },
  email: {
    marginTop: SPACE._2xl
  },
  password: {
    marginTop: SPACE.lg
  },
  textFieldStyle: {
    borderWidth: 1
  },
  buttonViewStyle: {
    marginTop: SPACE.lg
  },
  buttonStyle: {
    height: 44
  },
  spannableText: {
    marginTop: SPACE._2xl,
    flexDirection: "row"
  },
  signInButtonText: {
    fontSize: FONT_SIZE.lg
  },
  messageText: { fontSize: FONT_SIZE.sm },
  cantLog: { fontSize: FONT_SIZE.sm },
  contactUs: { fontSize: FONT_SIZE.sm }
});
