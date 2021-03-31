import React, { FC } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

type Props = {};

const Agreement: FC<Props> = () => {
  //const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        {/*<AppFormDropDown*/}
        {/*  name={"games"}*/}
        {/*  validationLabelTestID={"gamesValidationTestID"}*/}
        {/*  labelProps={{*/}
        {/*    text: STRINGS.roommateAgreement.dropDownTitle.frustrated,*/}
        {/*    weight: "semi-bold"*/}
        {/*  }}*/}
        {/*  appDropDownProps={{*/}
        {/*    title: STRINGS.profile.dropDownInitialValue.addOptions,*/}
        {/*    items: [*/}
        {/*      { id: "0", title: "BattleField" },*/}
        {/*      { id: "1", title: "Assassin Creed" },*/}
        {/*      { id: "2", title: "Call Of Duty" }*/}
        {/*    ],*/}
        {/*    selectedItemCallback: () => {*/}
        {/*      //setGamesTitle(item.title);*/}
        {/*    },*/}
        {/*    style: [*/}
        {/*      styles.dropDown,*/}
        {/*      { borderColor: theme.themedColors.border }*/}
        {/*    ]*/}
        {/*  }}*/}
        {/*/>*/}
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.lg
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
  }
});

export default Agreement;
