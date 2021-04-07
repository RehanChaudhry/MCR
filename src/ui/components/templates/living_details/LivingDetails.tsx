import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

export const LivingDetails = optimizedMemo(({}) => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
      <View style={styles.innerCardStyle}>
        {/*<HeadingWithText*/}
        {/*  headingText={STRINGS.profile.livingDetails.heading}*/}
        {/*  //text={STRINGS.profile.livingDetails.title}*/}
        {/*  headingFontWeight={"semi-bold"}*/}
        {/*  headingStyle={[*/}
        {/*    styles.headingStyle,*/}
        {/*    { color: theme.themedColors.label }*/}
        {/*  ]}*/}
        {/*  //textStyle={[{ color: theme.themedColors.labelSecondary }]}*/}
        {/*/>*/}
        <AppLabel
          text={STRINGS.profile.livingDetails.heading}
          weight={"semi-bold"}
          style={[styles.headingStyle, { fontSize: FONT_SIZE.base }]}
        />
      </View>
      <View style={[styles.horizontalLine]} />
      <View style={styles.innerCardStyle}>
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
      </View>
    </CardView>
  );
});

const styles = StyleSheet.create({
  cardStyles: {
    marginTop: SPACE.lg,
    marginHorizontal: SPACE.lg
  },
  innerCardStyle: {
    padding: SPACE.lg
  },
  headingStyle: {
    // paddingHorizontal: SPACE.sm,
    //paddingBottom: SPACE.sm
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: grayShades.warmGray["300"]
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
