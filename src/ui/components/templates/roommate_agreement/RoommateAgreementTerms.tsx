import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { CardView } from "ui/components/atoms/CardView";
import { FONT_SIZE, SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppSwitch } from "ui/components/atoms/app_switch/AppSwitch";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

type Props = {};

const RoommateAgreementTerms: FC<Props> = () => {
  const theme = usePreferredTheme();
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingText={"Roommate Agreement Terms"}
          headingStyle={[
            styles.headingStyle,
            { color: theme.themedColors.label }
          ]}
          headingFontWeight={"semi-bold"}
          text={
            "We encourage you to discuss any issues with your roommate(s), as most disagreements can be resolved by discussing them openly and honestly. Your roommate(s) may think differently than you do, and usually do not realize that there is a problem if it is not discussed. Student staff members can help to facilitate the conversation with your roommate(s), as opposed to fixing the problem for you, which will help you and your roommate(s) create ways to communicate more effectively in regard to other matters."
          }
          textStyle={[styles.textStyle]}
        />
        <AppSwitch
          defaultValue={false}
          onValueChange={() => {}}
          showCustomThumb={true}
          style={styles.switchButton}
        />
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
  }
});

export default RoommateAgreementTerms;
