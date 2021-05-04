import { FONT_SIZE, SPACE, STRINGS } from "config";
import Strings from "config/Strings";
import { FormikValues } from "formik";
import { usePreferredTheme } from "hooks";
import ReportContentApiRequestModel from "models/api_requests/ReportContentApiRequestModel";
import React from "react";
import { StyleSheet, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import SimpleToast from "react-native-simple-toast";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import Screen from "ui/components/atoms/Screen";
import { BUTTON_TYPES } from "ui/components/molecules/app_button/AppButton";
import AppForm from "ui/components/molecules/app_form/AppForm";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import AppFormFormSubmit from "ui/components/molecules/app_form/AppFormSubmit";
import { AppLog } from "utils/Util";
import * as Yup from "yup";

type Props = {
  closeScreen: () => void;
  onPostReportContent: (request: ReportContentApiRequestModel) => void;
  shouldShowProgressBar?: boolean;
  communityId: number;
};

const validationSchema = Yup.object().shape({
  reason: Yup.string().required(
    Strings.reportContent.enter_reason_validation
  )
});

let initialValues: FormikValues = {
  reason: ""
};

export const ReportContentView = React.memo<Props>(
  ({ onPostReportContent, shouldShowProgressBar, communityId }) => {
    const theme = usePreferredTheme();
    let problems: string[] = [];
    const onSubmit = (_value: FormikValues) => {
      if (problems.length < 1) {
        SimpleToast.show("Please select at least one problem");
      } else {
        AppLog.log("form values" + initialValues);
        const unique = new Set(problems);
        const uniqueArray = [...unique]; // array
        AppLog.log("unique: " + uniqueArray);
        onPostReportContent({
          reason: _value.reason,
          referenceId: communityId,
          problems: uniqueArray,
          type: "post"
        });
      }
    };

    return (
      <KeyboardAwareScrollView keyboardOpeningTime={50} extraHeight={200}>
        <Screen style={styles.mainContainer} shouldAddBottomInset={false}>
          <View style={styles.container}>
            <AppLabel
              text={Strings.reportContent.selectProblemToCont}
              weight="semi-bold"
              style={styles.heading}
            />
            <AppLabel
              text={Strings.reportContent.reportPostAfterSelectingProb}
              style={[
                styles.marginTopXS,
                { color: theme.themedColors.interface["700"] },
                styles.subHeading
              ]}
              numberOfLines={0}
            />
            <AppForm
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={validationSchema}>
              <CheckboxWithText
                text={Strings.reportContent.offensiveContent}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.offensiveContent);
                    AppLog.log(problems);
                  }
                }}
                style={styles.marginTopLg}
              />
              <CheckboxWithText
                text={Strings.reportContent.harassment}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.harassment);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.bullying}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.bullying);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.spam}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.spam);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.violence}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.violence);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.concerningContent}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.concerningContent);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.nudity}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.nudity);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.threats}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.threats);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.hateSpeech}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.hateSpeech);
                    AppLog.log(problems);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.somethingElse}
                onChange={(value) => {
                  if (value) {
                    problems.push(Strings.reportContent.somethingElse);
                    AppLog.log(problems);
                  }
                }}
              />
              <AppLabel
                text={Strings.reportContent.reason}
                weight="semi-bold"
                style={[styles.marginTopLg, styles.subHeading]}
              />
              <AppFormField
                fieldTestID="reason"
                validationLabelTestID={"reasonValidationLabel"}
                name="reason"
                fieldInputProps={{
                  placeholder: STRINGS.reportContent.reasonPlaceholder,
                  autoCapitalize: "none",
                  placeholderTextColor: theme.themedColors.placeholder,
                  style: { color: theme.themedColors.label },
                  viewStyle: [
                    styles.descriptionView,
                    {
                      backgroundColor: theme.themedColors.background,
                      borderColor: theme.themedColors.border
                    }
                  ]
                }}
              />

              <AppFormFormSubmit
                text={Strings.reportContent.submitSpamReport}
                buttonType={BUTTON_TYPES.NORMAL}
                fontWeight={"semi-bold"}
                shouldShowProgressBar={shouldShowProgressBar}
                textStyle={[{ color: theme.themedColors.background }]}
                buttonStyle={[
                  styles.marginTopLg,
                  { backgroundColor: theme.themedColors.danger }
                ]}
              />

              {/*<AppButton*/}
              {/*  text={Strings.reportContent.submitSpamReport}*/}
              {/*  buttonStyle={[*/}
              {/*    { backgroundColor: theme.themedColors.danger },*/}
              {/*    styles.marginTopLg*/}
              {/*  ]}*/}
              {/*  textStyle={{ color: theme.themedColors.background }}*/}
              {/*  fontWeight="bold"*/}
              {/*  onPress={closeScreen}*/}
              {/*/>*/}
            </AppForm>
          </View>
        </Screen>
      </KeyboardAwareScrollView>
    );
  }
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  container: {
    margin: SPACE.lg
  },
  marginTopXS: {
    marginTop: SPACE.xs
  },
  inputFieldRow: {
    flex: 1,
    paddingTop: SPACE.xs
  },
  descriptionView: {
    height: 100,
    borderWidth: 1
  },
  reasonContainer: {
    flexDirection: "row",
    marginTop: SPACE.xs
  },
  heading: {
    fontSize: FONT_SIZE.base
  },
  subHeading: {
    fontSize: FONT_SIZE.sm
  },
  marginTopLg: {
    marginTop: SPACE.lg
  },
  keyboardAvoidingView: {
    width: "100%",
    height: "100%"
  }
});
