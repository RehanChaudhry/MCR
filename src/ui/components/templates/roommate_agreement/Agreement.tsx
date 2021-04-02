import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import AppFormField from "ui/components/molecules/app_form/AppFormField";

type Props = {};

const Agreement: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <AppFormDropDown
          name="frustrated"
          validationLabelTestID={"frustratedValidationTestID"}
          labelProps={{
            text: STRINGS.roommateAgreement.dropDownTitle.frustrated,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          appDropDownProps={{
            title: STRINGS.profile.dropDownInitialValue.addOptions,
            items: [
              { id: "0", title: "Having a group discussion" },
              { id: "1", title: "Split" },
              { id: "2", title: "Any thing else" }
            ],
            selectedItemCallback: () => {
              //setGamesTitle(item.title);
            },
            style: [
              styles.dropDown,
              { borderColor: theme.themedColors.border }
            ]
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="upset"
          validationLabelTestID={"upsetValidationLabel"}
          name="upset"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.upset,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="substance"
          validationLabelTestID={"substanceValidationLabel"}
          name="substance"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.substance,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="temperature"
          validationLabelTestID={"temperatureValidationLabel"}
          name="temperature"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.temperature,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="comfortable"
          validationLabelTestID={"comfortableValidationLabel"}
          name="comfortable"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.comfortable,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="notice"
          validationLabelTestID={"noticeValidationLabel"}
          name="notice"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.notice,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="support"
          validationLabelTestID={"supportValidationLabel"}
          name="support"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.support,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
        <View style={styles.spacer} />
        <AppFormField
          fieldTestID="feel"
          validationLabelTestID={"feelValidationLabel"}
          name="feel"
          labelProps={{
            text: STRINGS.roommateAgreement.formTitle.feel,
            weight: "semi-bold",
            numberOfLines: 0
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder:
              STRINGS.roommateAgreement.textFieldPlaceholder.response,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.placeholder,
            viewStyle: [
              styles.aboutMe,
              {
                backgroundColor: theme.themedColors.background,
                borderColor: theme.themedColors.border
              }
            ],
            style: [
              styles.inputFieldRow,
              {
                color: theme.themedColors.label
              }
            ],
            multiline: true,
            textAlignVertical: "top"
          }}
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg,
    paddingBottom: SPACE.lg
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  },
  textStyle: {
    marginTop: SPACE.sm,
    color: grayShades.warmGray["300"]
  },
  headingStyle: {
    fontSize: FONT_SIZE.md
  },
  buttonView: {
    marginTop: SPACE.md
  },
  learnMore: {
    fontSize: FONT_SIZE._2xsm,
    fontWeight: "bold",
    textAlign: "left"
  },
  switchButton: {
    paddingBottom: SPACE.lg
  },
  dropDown: {
    borderWidth: 1
  },
  spacer: {
    paddingBottom: SPACE.lg
  },
  textFieldStyle: {
    borderWidth: 1
  },
  aboutMe: {
    height: 80,
    borderWidth: 1,
    paddingVertical: SPACE.xsm
  },
  inputFieldRow: {
    flex: 1
  }
});

export default Agreement;
