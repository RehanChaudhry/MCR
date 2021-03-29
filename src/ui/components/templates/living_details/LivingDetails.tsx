import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";

export const LivingDetails = optimizedMemo(({}) => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
      <HeadingWithText
        headingText={STRINGS.profile.livingDetails.heading}
        text={STRINGS.profile.livingDetails.title}
        headingFontWeight={"semi-bold"}
        headingStyle={[
          styles.headingStyle,
          { color: theme.themedColors.label }
        ]}
        textStyle={[{ color: theme.themedColors.labelSecondary }]}
      />
      <View
        style={[
          styles.horizontalLine,
          { backgroundColor: theme.themedColors.interface["700"] }
        ]}
      />
      <AppFormField
        fieldTestID="studentId"
        validationLabelTestID={"studentIdValidationLabel"}
        name="studentId"
        labelProps={{
          text: STRINGS.profile.formTitle.studentID,
          weight: "semi-bold"
        }}
        readOnly={true}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          autoCapitalize: "none",
          value: "123456",
          style: { color: theme.themedColors.label },
          shouldDisable: true,
          placeholderTextColor: theme.themedColors.placeholder,
          viewStyle: [
            styles.textFieldStyle,
            {
              backgroundColor: theme.themedColors.interface["100"],
              borderColor: theme.themedColors.border
            }
          ]
        }}
      />
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="programs"
        validationLabelTestID={"programsValidationLabel"}
        name="programs"
        labelProps={{
          text: STRINGS.profile.formTitle.programs,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.programs,
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
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="community"
        validationLabelTestID={"communityValidationLabel"}
        name="community"
        labelProps={{
          text: STRINGS.profile.formTitle.community,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.community,
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
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="building"
        validationLabelTestID={"communityValidationLabel"}
        name="building"
        labelProps={{
          text: STRINGS.profile.formTitle.building,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.building,
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
      <View style={styles.spacer} />
      <AppFormField
        fieldTestID="room"
        validationLabelTestID={"roomValidationLabel"}
        name="room"
        labelProps={{
          text: STRINGS.profile.formTitle.room,
          weight: "semi-bold"
        }}
        fieldInputProps={{
          textContentType: "name",
          keyboardType: "default",
          returnKeyType: "next",
          placeholder: STRINGS.profile.placeHolder.room,
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
    </CardView>
  );
});

const styles = StyleSheet.create({
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg,
    padding: SPACE.lg
  },
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
    paddingVertical: SPACE.sm
  },
  horizontalLine: {
    height: 0.5,
    marginVertical: SPACE.lg
  },
  viewFieldStyle: {
    borderWidth: 1
  },
  textFieldStyle: {
    borderWidth: 1
  },
  spacer: {
    paddingBottom: SPACE.lg
  }
});
