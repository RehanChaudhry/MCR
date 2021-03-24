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
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import * as Yup from "yup";
import { FormikValues } from "formik";
import { AppLog } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import MultilineSpannableText from "ui/components/atoms/multiline_spannable_text/MultilineSpannableText";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";

type Props = {
  openForgotPasswordScreen?: () => void;
  shouldShowProgressBar?: boolean;
};

const validationSchema = Yup.object().shape({
  email: Yup.string().required("Enter your email address")
});

let initialValues: FormikValues = {
  email: ""
};
const onSubmit = (_value: FormikValues) => {
  initialValues = _value;
  AppLog.log("form values" + initialValues);
};

export const ForgotPasswordView = React.memo<Props>(({}) => {
  const theme = usePreferredTheme();

  return (
    <Screen>
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
          />

          <Logo style={styles.logo} />

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
            <View style={styles.email} />
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
                keyboardType: "default",
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

            <View style={styles.buttonViewStyle}>
              <AppFormFormSubmit
                text={STRINGS.forgotpassword.reset_password}
                buttonType={BUTTON_TYPES.NORMAL}
                fontWeight={"semi-bold"}
                textStyle={{ color: theme.themedColors.background }}
                buttonStyle={[
                  styles.buttonStyle,
                  { backgroundColor: theme.themedColors.primary }
                ]}
              />
            </View>
          </AppForm>

          <View style={styles.spannableText}>
            <MultilineSpannableText
              text={[
                { id: 1, text: STRINGS.login.cant_log },
                { id: 1, text: STRINGS.login.contact_us }
              ]}
              textStyle={[
                { fontSize: SPACE.md },
                { fontSize: SPACE.md, color: theme.themedColors.primary }
              ]}
            />
          </View>
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
    marginTop: SPACE.xl
  },
  logo: {
    marginTop: SPACE._2xl
  },
  forgotPasswordHeading: {
    fontSize: FONT_SIZE._2xl,
    marginTop: 40
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
    fontSize: FONT_SIZE.md
  }
});