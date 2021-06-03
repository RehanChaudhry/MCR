import { FONT_SIZE, SPACE, STRINGS } from "config";
import Strings from "config/Strings";
import { FormikValues } from "formik";
import { usePreferredTheme } from "hooks";
import ReportContentApiRequestModel from "models/api_requests/ReportContentApiRequestModel";
import React, { useState } from "react";
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

const validationSchema = Yup.object().shape({});

let initialValues: FormikValues = {
  reason: ""
};

export const ReportContentView = React.memo<Props>(
  ({ onPostReportContent, shouldShowProgressBar, communityId }) => {
    const theme = usePreferredTheme();
    const [prob, setProb] = useState<string[]>([]);
    const onSubmit = (_value: FormikValues) => {
      if (prob.length < 1) {
        SimpleToast.show("Please select at least one problem");
      } else {
        AppLog.log("form values" + initialValues);
        const unique = new Set(prob);
        const uniqueArray = [...unique]; // array
        onPostReportContent({
          reason: _value.reason,
          referenceId: communityId,
          problems: uniqueArray,
          type: "post"
        });
      }
    };

    const updateState = (checkedValue: string) => {
      setProb((prevState) => [...prevState, checkedValue]);
    };

    const removeParticularItem = (checkedValue: string) => {
      setProb(
        prob.filter((problem) => {
          return problem !== checkedValue;
        })
      );
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
                    updateState(Strings.reportContent.offensiveContent);
                  } else {
                    removeParticularItem(
                      Strings.reportContent.offensiveContent
                    );
                  }
                }}
                style={styles.marginTopLg}
              />
              <CheckboxWithText
                text={Strings.reportContent.harassment}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.harassment);
                  } else {
                    removeParticularItem(Strings.reportContent.harassment);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.bullying}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.bullying);
                  } else {
                    removeParticularItem(Strings.reportContent.bullying);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.spam}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.spam);
                  } else {
                    removeParticularItem(Strings.reportContent.spam);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.violence}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.violence);
                  } else {
                    removeParticularItem(Strings.reportContent.violence);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.concerningContent}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.concerningContent);
                  } else {
                    removeParticularItem(
                      Strings.reportContent.concerningContent
                    );
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.nudity}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.nudity);
                  } else {
                    removeParticularItem(Strings.reportContent.nudity);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.threats}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.threats);
                  } else {
                    removeParticularItem(Strings.reportContent.threats);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.hateSpeech}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.hateSpeech);
                  } else {
                    removeParticularItem(Strings.reportContent.hateSpeech);
                  }
                }}
              />
              <CheckboxWithText
                text={Strings.reportContent.somethingElse}
                onChange={(value) => {
                  if (value) {
                    updateState(Strings.reportContent.somethingElse);
                  } else {
                    removeParticularItem(
                      Strings.reportContent.somethingElse
                    );
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
                  multiline: true,
                  numberOfLines: 6,
                  textAlignVertical: "top",
                  keyboardType: "default",
                  returnKeyType: "next",
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
