import { FONT_SIZE, SPACE, STRINGS } from "config";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import CheckboxWithText from "ui/components/atoms/CheckboxWithText";
import Screen from "ui/components/atoms/Screen";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import { AppInputField } from "ui/components/molecules/appinputfield/AppInputField";
import { AppLog } from "utils/Util";

type Props = {
  closeScreen: () => void;
};

export const ReportContentView = React.memo<Props>(({ closeScreen }) => {
  const theme = usePreferredTheme();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.keyboardAvoidingView}>
      <ScrollView keyboardShouldPersistTaps={"handled"}>
        <Screen style={styles.mainContainer}>
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
            <CheckboxWithText
              text={Strings.reportContent.offensiveContent}
              onChange={(value) => AppLog.log(value)}
              style={styles.marginTopLg}
            />
            <CheckboxWithText
              text={Strings.reportContent.harassment}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.bullying}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.spam}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.violence}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.concerningContent}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.nudity}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.threats}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.hateSpeech}
              onChange={(value) => AppLog.log(value)}
            />
            <CheckboxWithText
              text={Strings.reportContent.somethingElse}
              onChange={(value) => AppLog.log(value)}
            />
            <AppLabel
              text={Strings.reportContent.reason}
              weight="semi-bold"
              style={[styles.marginTopLg, styles.subHeading]}
            />
            <View style={styles.reasonContainer}>
              <AppInputField
                textAlignVertical={"top"}
                viewStyle={[
                  styles.descriptionView,
                  {
                    backgroundColor: theme.themedColors.background,
                    borderColor: theme.themedColors.secondary
                  }
                ]}
                multiline={true}
                numberOfLines={6}
                placeholderTextColor={theme.themedColors.interface["600"]}
                placeholder={STRINGS.reportContent.reasonPlaceholder}
                style={[
                  { color: theme.themedColors.label },
                  styles.inputFieldRow
                ]}
              />
            </View>

            <AppButton
              text={Strings.reportContent.submitSpamReport}
              buttonStyle={[
                { backgroundColor: theme.themedColors.danger },
                styles.marginTopLg
              ]}
              textStyle={{ color: theme.themedColors.background }}
              fontWeight="bold"
              onPress={closeScreen}
            />
          </View>
        </Screen>
      </ScrollView>
    </KeyboardAvoidingView>
  );
});

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
