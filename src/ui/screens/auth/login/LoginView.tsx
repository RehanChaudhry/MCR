import { COLORS, FONT_SIZE, STRINGS } from "config";
import { useFormik } from "formik";
import React, { FC } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppFormValidationLabel } from "ui/components/molecules/app_form/AppFormValidationLabel";
import Screen from "ui/components/atoms/Screen";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  signIn?: (values: LoginFormValues) => void;
  shouldShowProgressBar: boolean;
};

type LoginFormValues = {
  email: string;
  password: string;
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is a required field.")
    .email(STRINGS.login.enter_valid_email_validation),
  password: Yup.string()
    .required("Password is a required field.")
    .min(8, STRINGS.login.pass_validation)
});

const initialFormValues: LoginFormValues = {
  email: "",
  password: ""
};

export const LoginView: FC<Props> = (props) => {
  AppLog.log(
    "in LoginView, props.shouldShowProgressBar: " +
      props.shouldShowProgressBar
  );

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values) => {
      AppLog.log(values);
      props.signIn?.(values);
    },
    validationSchema: validationSchema
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}>
      <ScrollView
        style={styles.scrollView}
        keyboardShouldPersistTaps={"handled"}>
        <Screen style={styles.container}>
          <View style={styles.cardView}>
            <AppLabel
              text={STRINGS.login.email_address}
              weight="semi-bold"
              style={styles.headingBold}
            />
            <AppInputField
              placeholder={STRINGS.login.enter_your_email}
              valueToShowAtStart={initialFormValues.email}
              shouldDisable={props.shouldShowProgressBar}
              keyboardType="email-address"
              autoFocus
              textContentType="emailAddress"
              onBlur={() => formik.setFieldTouched("email")}
              onChangeText={formik.handleChange("email")}
              style={styles.inputField}
              // leftIcon={require("assets/images/cross.png")}
              // rightIcon={require("assets/images/cross.png")}
            />
            <AppFormValidationLabel
              errorString={formik.errors.email}
              shouldVisible={formik.touched.email}
            />

            <AppLabel
              text={STRINGS.login.password}
              weight="semi-bold"
              style={styles.headingBold}
            />
            <AppInputField
              placeholder={STRINGS.login.enter_your_pass}
              valueToShowAtStart={initialFormValues.password}
              shouldDisable={props.shouldShowProgressBar}
              secureTextEntry={true}
              textContentType="password"
              onBlur={() => formik.setFieldTouched("password")}
              onChangeText={formik.handleChange("password")}
              style={styles.inputField}
            />
            <AppFormValidationLabel
              errorString={formik.errors.password}
              shouldVisible={formik.touched.password}
            />

            <View style={styles.signInAndForgotPasswordContainer}>
              <AppButton
                text={STRINGS.login.sign_in}
                onPress={formik.handleSubmit}
                buttonStyle={styles.buttonWidth}
                shouldShowProgressBar={props.shouldShowProgressBar}
                buttonType={BUTTON_TYPES.BORDER}
              />
              <View style={styles.buttonContainer} />
            </View>
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollView: { backgroundColor: COLORS.backgroundColor },

  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    padding: 17,
    flex: 1
  },

  alreadyAMember: {
    color: COLORS.textColor2,
    fontSize: FONT_SIZE.xl,
    textAlign: "center",
    alignSelf: "flex-start"
  },

  pleaseSignInUsing: {
    color: COLORS.textColor1,
    fontSize: FONT_SIZE.md,
    marginTop: 6,
    textAlign: "center",
    alignSelf: "flex-start"
  },

  headingBold: {
    color: COLORS.textColor2,
    fontSize: FONT_SIZE.md,
    marginTop: 16
  },

  inputField: { marginTop: 6 },

  forgotPassword: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.md
  },

  haveAnInviteCode: {
    color: COLORS.textColor2,
    fontSize: FONT_SIZE.md
  },

  cardView: {
    padding: 17,
    flex: 1,
    marginTop: 25,
    backgroundColor: COLORS.white,
    overflow: "hidden",

    // border
    borderStyle: "solid",
    borderColor: COLORS.white,
    borderRadius: 10,

    //shadow
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },

  signInAndForgotPasswordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16
  },

  inviteAndActivateContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: -17,
    marginTop: 17,
    padding: 17,
    backgroundColor: COLORS.backgroundColor2
  },
  keyboardAvoidingView: {
    width: "100%",
    height: "100%"
  },
  buttonWidth: {
    width: "40%",
    alignSelf: "flex-start"
  },
  buttonContainer: { flex: 1 }
});
