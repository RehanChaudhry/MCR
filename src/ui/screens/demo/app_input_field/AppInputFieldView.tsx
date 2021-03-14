import { STRINGS } from "config";
// import { useFormik } from "formik";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { ThemeSwitcher } from "ui/components/templates/ThemeSwitcher";
// import { AppLog } from "utils/Util";
// import * as Yup from "yup";

// type LoginFormValues = {
//   email: string;
//   password: string;
// };
// const initialFormValues: LoginFormValues = {
//   email: "",
//   password: ""
// };
//
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .required("Email address is a required field.")
//     .email(Strings.login.enter_valid_email_validation)
// });

type Props = {};

export const AppInputFieldView = React.memo<Props>(() => {
  const theme = usePreferredTheme();
  // const formik = useFormik({
  //   initialValues: initialFormValues,
  //   onSubmit: (values) => {
  //     AppLog.log(values);
  //   },
  //   validationSchema: validationSchema
  // });
  return (
    <ThemeSwitcher>
      <View
        style={[
          styles.mainContainer,
          { backgroundColor: theme.themedColors.primaryBackground }
        ]}>
        <AppLabel
          text="FULL NAME"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppInputField
          placeholder="Full Name"
          autoFocus
          textContentType="name"
          viewStyle={{
            backgroundColor: theme.themedColors.secondaryBackground,
            borderColor: theme.themedColors.primaryBackground
          }}
          style={[
            styles.inputField,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppLabel
          text="SCHOOL NAME WITH STARTED VALUE"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppInputField
          placeholder={STRINGS.login.enter_your_email}
          valueToShowAtStart="School"
          keyboardType="email-address"
          autoFocus
          textContentType="emailAddress"
          viewStyle={{
            backgroundColor: theme.themedColors.secondaryBackground,
            borderColor: theme.themedColors.primaryBackground
          }}
          style={[
            styles.inputField,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppLabel
          text="EMAIL WITH LEFT ICON"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppInputField
          style={[
            styles.inputField,
            { color: theme.themedColors.primaryLabelColor }
          ]}
          placeholder="Email"
          keyboardType="email-address"
          autoFocus
          textContentType="emailAddress"
          leftIcon={require("assets/images/mail.png")}
          viewStyle={{
            backgroundColor: theme.themedColors.secondaryBackground,
            borderColor: theme.themedColors.primaryBackground
          }}
          iconStyle={{ tintColor: theme.themedColors.primaryLabelColor }}
        />
        <AppLabel
          text="EMAIL WITH RIGHT ICON"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppInputField
          style={[
            styles.inputField,
            { color: theme.themedColors.primaryLabelColor }
          ]}
          placeholder="Email"
          keyboardType="email-address"
          autoFocus
          textContentType="emailAddress"
          rightIcon={require("assets/images/mail.png")}
          viewStyle={{
            backgroundColor: theme.themedColors.secondaryBackground,
            borderColor: theme.themedColors.primaryBackground
          }}
          iconStyle={{ tintColor: theme.themedColors.primaryLabelColor }}
        />
        <AppLabel
          text="CENTERED TWO INPUT FIELDS"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <View style={styles.dualInputTextContainer}>
          <View style={styles.firstSubContainer}>
            <AppInputField
              style={[
                styles.inputFieldRow,
                { color: theme.themedColors.primaryLabelColor }
              ]}
              placeholder="Email"
              keyboardType="email-address"
              autoFocus
              textContentType="emailAddress"
              rightIcon={require("assets/images/mail.png")}
              viewStyle={{
                backgroundColor: theme.themedColors.secondaryBackground,
                borderColor: theme.themedColors.primaryBackground
              }}
              iconStyle={{
                tintColor: theme.themedColors.primaryLabelColor
              }}
            />
          </View>
          <View style={styles.firstSubContainer}>
            <AppInputField
              style={[
                styles.inputFieldRow,
                { color: theme.themedColors.primaryLabelColor }
              ]}
              placeholder="Email"
              keyboardType="email-address"
              autoFocus
              textContentType="emailAddress"
              rightIcon={require("assets/images/mail.png")}
              viewStyle={{
                backgroundColor: theme.themedColors.secondaryBackground,
                borderColor: theme.themedColors.primaryBackground
              }}
              iconStyle={{
                tintColor: theme.themedColors.primaryLabelColor
              }}
            />
          </View>
        </View>
        <AppLabel
          text="DESCRIPTION"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />
        <AppInputField
          style={[
            styles.inputFieldRow,
            { color: theme.themedColors.primaryLabelColor }
          ]}
          placeholder="Write something about you"
          viewStyle={[
            styles.descriptionView,
            {
              backgroundColor: theme.themedColors.secondaryBackground,
              borderColor: theme.themedColors.primaryBackground
            }
          ]}
          iconStyle={{
            tintColor: theme.themedColors.primaryLabelColor
          }}
          multiline={true}
          textAlignVertical={"top"}
        />

        <AppLabel
          text="INPUT FIELD WITH BORDER"
          style={[
            styles.text,
            { color: theme.themedColors.primaryLabelColor }
          ]}
        />

        <AppInputField
          style={[
            styles.inputFieldRow,
            {
              color: theme.themedColors.primaryLabelColor
            }
          ]}
          placeholder="Write something about you"
          viewStyle={[
            styles.descriptionViewWithBorder,
            {
              backgroundColor: theme.themedColors.secondaryBackground,
              borderColor: theme.themedColors.tertiaryLabelColor
            }
          ]}
          iconStyle={{
            tintColor: theme.themedColors.primaryLabelColor
          }}
          multiline={true}
          textAlignVertical={"top"}
        />
      </View>
    </ThemeSwitcher>
  );
});

const styles = StyleSheet.create({
  mainContainer: {
    padding: 5,
    marginBottom: 16
  },
  text: {
    marginBottom: 8,
    marginTop: 16
  },
  inputField: {
    marginTop: 6
  },
  dualInputTextContainer: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 16
  },
  firstSubContainer: {
    flex: 0.5,
    alignItems: "flex-start",
    marginRight: 5
  },
  secondContainer: {
    marginLeft: 5
  },
  inputFieldRow: {
    flex: 1,
    marginTop: 6
  },
  descriptionView: {
    height: 100
  },
  descriptionViewWithBorder: {
    height: 100,
    borderWidth: 1
  }
});
