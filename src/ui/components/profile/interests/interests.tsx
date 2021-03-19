import React, { useState } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE } from "config";
import { AppFormDropDown } from "../../molecules/app_form_dropdown/AppFormDropDown";
// import { AppFormRadioButton } from "../../molecules/app_form_radio_buttons/AppFormRadioButton";
// import { DIRECTION_TYPE } from "../../atoms/radio_group/RadioGroup";
// import AppFormField from "../../molecules/app_form/AppFormField";
// import * as Yup from "yup";
// import { FormikValues } from "formik";
// import AppForm from "../../molecules/app_form/AppForm";

//forms validation
// const validationSchema = Yup.object().shape({
//   homeTown: Yup.string().required("Enter your hometown"),
//   intendedMajor: Yup.string().required("Enter your intended major")
// });

export const Interests = React.memo(
  (
    {
      // @ts-ignore
      // initialValues = {
      //   homeTown: "",
      //   intendedMajor: ""
      // },
      // // @ts-ignore
      // onSubmit = (_values: FormikValues) => {}
    }
  ) => {
    const theme = usePreferredTheme();
    const [hobbiesTitle, setHobbiesTitle] = useState("Added 2 options");
    const [membershipsTitle, setMembershipsTitle] = useState(
      "Add options"
    );
    const [moviesTitle, setMoviesTitle] = useState("Added 3 options");
    const [musicTitle, setMusicTitle] = useState("Add options");
    const [booksTitle, setBooksTitle] = useState("Add options");
    const [gamesTitle, setGamesTitle] = useState("Add options");
    return (
      <CardView style={styles.cardStyles}>
        <HeadingWithText
          headingText={"Interests"}
          text={"Tell us about what do you love to do?"}
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
          labelProps={{ text: "Interests & Hobbies", weight: "semi-bold" }}
          appDropDownProps={{
            title: hobbiesTitle,
            items: [
              { id: "0", title: "Books" },
              { id: "1", title: "Games" },
              { id: "2", title: "Sports" }
            ],
            selectedItemCallback: (item) => {
              setHobbiesTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />
        <AppFormDropDown
          labelProps={{ text: "Club & Memberships", weight: "semi-bold" }}
          appDropDownProps={{
            title: membershipsTitle,
            items: [
              { id: "0", title: "Arena" },
              { id: "1", title: "Golf" },
              { id: "2", title: "Marena" }
            ],
            selectedItemCallback: (item) => {
              setMembershipsTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />
        <AppFormDropDown
          labelProps={{
            text: "Favorite Movies & TV Shows",
            weight: "semi-bold"
          }}
          appDropDownProps={{
            title: moviesTitle,
            items: [
              { id: "0", title: "Money Heist" },
              { id: "1", title: "You" },
              { id: "2", title: "The Boys" }
            ],
            selectedItemCallback: (item) => {
              setMoviesTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />
        <AppFormDropDown
          labelProps={{ text: "Music", weight: "semi-bold" }}
          appDropDownProps={{
            title: musicTitle,
            items: [
              { id: "0", title: "ColdPlay" },
              { id: "1", title: "Enrique" },
              { id: "2", title: "Justin" }
            ],
            selectedItemCallback: (item) => {
              setMusicTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />
        <AppFormDropDown
          labelProps={{ text: "Books", weight: "semi-bold" }}
          appDropDownProps={{
            title: booksTitle,
            items: [
              { id: "0", title: "Science" },
              { id: "1", title: "Rules" },
              { id: "2", title: "History" }
            ],
            selectedItemCallback: (item) => {
              setBooksTitle(item.title);
            }
          }}
        />
        <View style={styles.spacer} />
        <AppFormDropDown
          labelProps={{ text: "Games", weight: "semi-bold" }}
          appDropDownProps={{
            title: gamesTitle,
            items: [
              { id: "0", title: "BattleField" },
              { id: "1", title: "Assassin Creed" },
              { id: "2", title: "Call Of Duty" }
            ],
            selectedItemCallback: (item) => {
              setGamesTitle(item.title);
            }
          }}
        />
      </CardView>
    );
  }
);

const styles = StyleSheet.create({
  cardStyles: {
    margin: SPACE.lg,
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
