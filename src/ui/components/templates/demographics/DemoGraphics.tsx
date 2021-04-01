import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import { AppFormDropDown } from "ui/components/molecules/app_form/AppFormDropDown";
import { AppFormRadioButton } from "ui/components/molecules/app_form/AppFormRadioButton";
import { DIRECTION_TYPE } from "ui/components/atoms/radio_group/RadioGroup";
import AppFormField from "ui/components/molecules/app_form/AppFormField";
import { optimizedMemo } from "ui/components/templates/optimized_memo/optimized_memo";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

export const DemoGraphics = optimizedMemo(({}) => {
  const theme = usePreferredTheme();
  //const [title, setTitle] = useState("Select your gender");
  return (
    <CardView style={styles.cardStyles}>
      <View style={styles.innerCardStyle}>
        <HeadingWithText
          headingText={STRINGS.profile.demoGraphics.heading}
          text={STRINGS.profile.demoGraphics.title}
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
        <AppFormDropDown
          name="gender"
          validationLabelTestID={"genderValidationTestID"}
          labelProps={{
            text: STRINGS.profile.dropDownTitle.gender,
            weight: "semi-bold"
          }}
          appDropDownProps={{
            title: STRINGS.profile.dropDownInitialValue.gender,
            items: [
              { id: "0", title: "Male" },
              { id: "1", title: "Female" },
              { id: "2", title: "Others" }
            ],
            selectedItemCallback: () => {
              //setTitle(item.title);
            },
            style: [
              styles.dropDown,
              { borderColor: theme.themedColors.border }
            ]
          }}
        />

        <View style={styles.spacer} />

        <AppFormRadioButton
          labelProps={{
            text:
              STRINGS.profile.demoGraphics.radioButton.smokingHabitTitle,
            weight: "semi-bold"
          }}
          radioData={[
            {
              id: 1,
              label:
                STRINGS.profile.demoGraphics.radioButton.smokingHabitValues
                  .never
            },
            {
              id: 2,
              label:
                STRINGS.profile.demoGraphics.radioButton.smokingHabitValues
                  .occasionally
            },
            {
              id: 3,
              label:
                STRINGS.profile.demoGraphics.radioButton.smokingHabitValues
                  .frequently
            }
          ]}
          direction={DIRECTION_TYPE.HORIZONTAL}
        />
        <View style={styles.spacer} />

        <AppFormField
          fieldTestID="homeTown"
          validationLabelTestID={"homeTownValidationLabel"}
          name="homeTown"
          labelProps={{
            text: STRINGS.profile.formTitle.homeTown,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.placeHolder.homeTown,
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
          fieldTestID="intendedMajor"
          validationLabelTestID={"intendedMajorValidationLabel"}
          name="intendedMajor"
          labelProps={{
            text: STRINGS.profile.formTitle.intendedMajor,
            weight: "semi-bold"
          }}
          fieldInputProps={{
            textContentType: "name",
            keyboardType: "default",
            returnKeyType: "next",
            placeholder: STRINGS.profile.placeHolder.intendedMajor,
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
    paddingVertical: SPACE.sm
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
