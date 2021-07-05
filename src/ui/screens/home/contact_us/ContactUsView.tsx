import React from "react";
import { usePreferredTheme } from "hooks";
import { FormikValues } from "formik";
import { AppLog } from "utils/Util";
import Screen from "ui/components/atoms/Screen";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import ArrowLeft from "assets/images/arrow_left.svg";
import { UniLogo } from "ui/components/atoms/UniLogo";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import Colors from "config/Colors";
import * as Yup from "yup";
import Strings from "config/Strings";
import { ContactUsApiRequestModel } from "models/api_requests/ContactUsApiRequestModel";

type Props = {
  onContactUsSubmit: (request: ContactUsApiRequestModel) => void;
  openLoginScreen: () => void;
  shouldShowProgressBar: boolean;
};
let initialValues: FormikValues = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  message: ""
};

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required(
    Strings.contact_us.enter_first_name_validation
  ),
  lastName: Yup.string().required(
    Strings.contact_us.enter_last_name_validation
  ),
  email: Yup.string()
    .email(Strings.login.enter_valid_email_validation)
    .required(Strings.login.email_required_validation),
  phoneNumber: Yup.string().required(
    Strings.contact_us.enter_phone_number_validation
  ),
  message: Yup.string().required(
    Strings.contact_us.enter_message_validation
  )
});

export const ContactUs = React.memo<Props>(
  ({ onContactUsSubmit, openLoginScreen, shouldShowProgressBar }) => {
    const theme = usePreferredTheme();

    const onSubmit = (_value: FormikValues) => {
      AppLog.log(() => "form values" + initialValues);
      // AppLog.logForcefully(() => "values: " + _value);

      onContactUsSubmit({
        firstName: _value.firstName,
        lastName: _value.lastName,
        email: _value.email,
        phoneNumber: _value.phoneNumber,
        message: _value.message
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
                  onPress={openLoginScreen}
                />
              )}
              containerStyle={styles.leftArrow}
            />

            <UniLogo />

            <AppLabel
              text={STRINGS.contact_us.contact_us}
              weight={"bold"}
              style={styles.signInHeading}
            />

            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <View style={styles.firstName}>
                <AppFormField
                  fieldTestID="firstName"
                  validationLabelTestID={"firstNameValidationLabel"}
                  name="firstName"
                  labelProps={{
                    text: STRINGS.contact_us.first_name,
                    weight: "semi-bold"
                  }}
                  fieldInputProps={{
                    textContentType: "name",
                    keyboardType: "default",
                    returnKeyType: "next",
                    placeholder: STRINGS.contact_us.enter_your_first_name,
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

              <View style={styles.lastName}>
                <AppFormField
                  fieldTestID="lastName"
                  validationLabelTestID={"lastNameValidationLabel"}
                  name="lastName"
                  labelProps={{
                    text: STRINGS.contact_us.last_name,
                    weight: "semi-bold"
                  }}
                  fieldInputProps={{
                    textContentType: "name",
                    keyboardType: "default",
                    returnKeyType: "next",
                    placeholder: STRINGS.contact_us.enter_your_last_name,
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
              </View>

              <View style={styles.phoneNumber}>
                <AppFormField
                  fieldTestID="phoneNumber"
                  validationLabelTestID={"phoneNumberValidationLabel"}
                  name="phoneNumber"
                  labelProps={{
                    text: STRINGS.contact_us.phone_number,
                    weight: "semi-bold"
                  }}
                  fieldInputProps={{
                    textContentType: "name",
                    keyboardType: "numbers-and-punctuation",
                    returnKeyType: "next",
                    placeholder: STRINGS.contact_us.phone_number_no,
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

              <View style={styles.message}>
                <AppFormField
                  fieldTestID="message"
                  validationLabelTestID={"messageValidationLabel"}
                  name="message"
                  labelProps={{
                    text: STRINGS.contact_us.message,
                    weight: "semi-bold"
                  }}
                  fieldInputProps={{
                    multiline: true,
                    numberOfLines: 6,
                    textAlignVertical: "top",
                    keyboardType: "default",
                    returnKeyType: "next",
                    placeholder:
                      STRINGS.createPost.placeholder
                        .startTypingYourMessage,
                    autoCapitalize: "none",
                    placeholderTextColor: theme.themedColors.placeholder,
                    style: [
                      { color: theme.themedColors.label },
                      styles.inputFieldRow
                    ],
                    viewStyle: [
                      styles.descriptionView,
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
                  text={STRINGS.contact_us.submit}
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
  firstName: {
    marginTop: SPACE._2xl
  },
  lastName: {
    marginTop: SPACE._2xl
  },
  email: {
    marginTop: SPACE._2xl
  },
  password: {
    marginTop: SPACE._2xl
  },
  phoneNumber: {
    marginTop: SPACE._2xl
  },
  message: {
    marginTop: SPACE._2xl
  },
  inputFieldRow: {
    flex: 1
  },
  descriptionView: {
    height: 100,

    borderWidth: 1.0
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
    marginTop: SPACE._2xl
  },
  signInButtonText: {
    fontSize: FONT_SIZE.lg
  }
});
