import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { StyleSheet, View } from "react-native";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { SPACE, STRINGS } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";
import { FieldBox } from "ui/components/atoms/FieldBox";
//import { FormikValues, useFormikContext } from "formik";

type Props = {};

export const Interests: React.FC<Props> = ({}) => {
  const theme = usePreferredTheme();
  //const { values } = useFormikContext<FormikValues>();

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
        <FieldBox
          name="hobbies"
          title={STRINGS.profile.dropDownTitle.hobbies}
          textStyle={{ color: theme.themedColors.placeholder }}
        />
        <View style={styles.spacer} />
        {/*<FieldBox*/}
        {/*  list={values[variableName(initialValues.memberships)]}*/}
        {/*  title={STRINGS.profile.dropDownTitle.memberShip}*/}
        {/*  textStyle={{ color: theme.themedColors.placeholder }}*/}
        {/*/>*/}
        {/*<View style={styles.spacer} />*/}
        {/*<FieldBox*/}
        {/*  list={values[variableName(initialValues.movies)]}*/}
        {/*  title={STRINGS.profile.dropDownTitle.movies}*/}
        {/*  textStyle={{ color: theme.themedColors.placeholder }}*/}
        {/*/>*/}
        {/*<View style={styles.spacer} />*/}
        {/*<FieldBox*/}
        {/*  list={values[variableName(initialValues.music)]}*/}
        {/*  title={STRINGS.profile.dropDownTitle.music}*/}
        {/*  textStyle={{ color: theme.themedColors.placeholder }}*/}
        {/*/>*/}
        {/*<View style={styles.spacer} />*/}
        {/*<FieldBox*/}
        {/*  list={values[variableName(initialValues.books)]}*/}
        {/*  title={STRINGS.profile.dropDownTitle.books}*/}
        {/*  textStyle={{ color: theme.themedColors.placeholder }}*/}
        {/*/>*/}
        {/*<View style={styles.spacer} />*/}
        {/*<FieldBox*/}
        {/*  list={values[variableName(initialValues.games)]}*/}
        {/*  title={STRINGS.profile.dropDownTitle.games}*/}
        {/*  textStyle={{ color: theme.themedColors.placeholder }}*/}
        {/*/>*/}
      </View>
    </CardView>
  );
};

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
