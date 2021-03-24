import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import { AppFormDropDown } from "ui/components/molecules/app_form_dropdown/AppFormDropDown";

export const Interests = React.memo(({}) => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardStyles}>
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
      <View
        style={[
          styles.horizontalLine,
          { backgroundColor: theme.themedColors.interface["700"] }
        ]}
      />

      <AppFormDropDown
        name={"hobbies"}
        validationLabelTestID={"hobbiesValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.hobbies,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.hobbies,
          items: [
            { id: "0", title: "Books" },
            { id: "1", title: "Games" },
            { id: "2", title: "Sports" }
          ],
          selectedItemCallback: () => {
            //setHobbiesTitle(item.title);
          }
        }}
      />
      <View style={styles.spacer} />
      <AppFormDropDown
        name={"memberships"}
        validationLabelTestID={"membershipsValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.memberShip,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.addOptions,
          items: [
            { id: "0", title: "Arena" },
            { id: "1", title: "Golf" },
            { id: "2", title: "Marena" }
          ],
          selectedItemCallback: () => {
            //setMembershipsTitle(item.title);
          }
        }}
      />
      <View style={styles.spacer} />
      <AppFormDropDown
        name={"movies"}
        validationLabelTestID={"moviesValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.movies,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.movies,
          items: [
            { id: "0", title: "Money Heist" },
            { id: "1", title: "You" },
            { id: "2", title: "The Boys" }
          ],
          selectedItemCallback: () => {
            //setMoviesTitle(item.title);
          }
        }}
      />
      <View style={styles.spacer} />
      <AppFormDropDown
        name={"music"}
        validationLabelTestID={"musicValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.music,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.addOptions,
          items: [
            { id: "0", title: "ColdPlay" },
            { id: "1", title: "Enrique" },
            { id: "2", title: "Justin" }
          ],
          selectedItemCallback: () => {
            //setMusicTitle(item.title);
          }
        }}
      />
      <View style={styles.spacer} />
      <AppFormDropDown
        name={"books"}
        validationLabelTestID={"booksValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.books,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.addOptions,
          items: [
            { id: "0", title: "Science" },
            { id: "1", title: "Rules" },
            { id: "2", title: "History" }
          ],
          selectedItemCallback: () => {
            //setBooksTitle(item.title);
          }
        }}
      />
      <View style={styles.spacer} />
      <AppFormDropDown
        name={"games"}
        validationLabelTestID={"gamesValidationTestID"}
        labelProps={{
          text: STRINGS.profile.dropDownTitle.games,
          weight: "semi-bold"
        }}
        appDropDownProps={{
          title: STRINGS.profile.dropDownInitialValue.addOptions,
          items: [
            { id: "0", title: "BattleField" },
            { id: "1", title: "Assassin Creed" },
            { id: "2", title: "Call Of Duty" }
          ],
          selectedItemCallback: () => {
            //setGamesTitle(item.title);
          }
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
