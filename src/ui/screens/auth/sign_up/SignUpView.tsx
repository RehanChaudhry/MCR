import { StackScreenProps } from "@react-navigation/stack/lib/typescript/src/types";
import { COLORS, FONT_SIZE } from "config";
import { useFormik } from "formik";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AuthStackParamList } from "routes";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Screen from "ui/components/atoms/Screen";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  sendEmailButtonCallback?: (values: SignUpFormValues) => void;
  shouldShowProgressBar: boolean;
  openLoginScreen?: () => void;
};

type SignUpFormValues = {
  email: string;
};

export type SignUpScreenProp = StackScreenProps<
  AuthStackParamList,
  "SignUp"
>;

const initialFormValues: SignUpFormValues = {
  email: ""
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .required("Email address is a required field.")
    .email("Enter valid emailP")
});

export const SignUpView = React.memo<Props>((props) => {
  AppLog.log(() => "Rendering SignUpView...");

  const formik = useFormik({
    initialValues: initialFormValues,
    onSubmit: (values: any) => {
      AppLog.log(() => values);
      props.sendEmailButtonCallback?.(values);
    },
    validationSchema: validationSchema
  });

  return (
    <ScrollView
      style={styles.scrollView}
      keyboardShouldPersistTaps={"handled"}>
      <Screen style={styles.container}>
        <View style={styles.cardView}>
          <AppLabel text="SignUp" />
          <AppButton
            text="Submit"
            onPress={() => {
              formik.handleSubmit();
            }}
            buttonType={BUTTON_TYPES.NORMAL}
          />
        </View>
      </Screen>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    padding: 20,
    flex: 1
  },

  logoImage: {
    height: 70,
    alignSelf: "center"
  },

  forgotYourPassword: {
    color: COLORS.textColor2,
    fontSize: FONT_SIZE.lg,
    textAlign: "center",
    alignSelf: "flex-start"
  },
  backtoSignIn: {
    color: COLORS.secondary,
    fontSize: FONT_SIZE.xs,
    textAlign: "center",
    alignSelf: "flex-end"
  },

  tellUsYourEmail: {
    color: COLORS.textColor1,
    fontSize: FONT_SIZE.xs,
    marginTop: 6,
    alignSelf: "flex-start"
  },

  headingBold: {
    color: COLORS.textColor2,
    fontSize: FONT_SIZE.xs,
    marginTop: 16
  },

  inputField: { marginTop: 6 },

  forgotPassword: {
    color: COLORS.secondary,
    fontSize: 12
  },

  haveAnInviteCode: {
    color: COLORS.textColor2,
    fontSize: 12
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
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: -3
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 5
  },
  scrollView: { backgroundColor: COLORS.backgroundColor },

  signInAndSignUpContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16
  },

  inviteAndActivateContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: -16,
    marginTop: 16,
    padding: 16,
    backgroundColor: COLORS.backgroundColor2
  },
  forgotPasswordHeadingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  }
});
