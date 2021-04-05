import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import AppFormField from "ui/components/molecules/app_form/AppFormField";

export const Interests = optimizedMemo(({}) => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
      <View style={styles.innerCardStyle}>
        <HeadingWithText
          headingText={STRINGS.profile.interests.heading}
          text={STRINGS.profile.interests.title}
          headingFontWeight={"semi-bold"}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.label }
          ]}
          textStyle={[{ color: theme.themedColors.labelSecondary }]}
        />
      </View>
      <View style={[styles.horizontalLine]} />
      <View style={styles.innerCardStyle}>
        <AppFormField
          name={"hobbies"}
          validationLabelTestID={"hobbiesValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.hobbies,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.hobbies,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.primary,
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
          name={"memberships"}
          validationLabelTestID={"membershipsValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.memberShip,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.addOptions,
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
          name={"movies"}
          validationLabelTestID={"moviesValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.movies,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.movies,
            autoCapitalize: "none",
            placeholderTextColor: theme.themedColors.primary,
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
          name={"music"}
          validationLabelTestID={"musicValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.music,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.addOptions,
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
          name={"books"}
          validationLabelTestID={"booksValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.books,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.addOptions,
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
          name={"games"}
          validationLabelTestID={"gamesValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.games,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.dropDownInitialValue.addOptions,
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
    paddingBottom: SPACE.sm
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
  },
  dropDown: {
    borderWidth: 1
  }
});
