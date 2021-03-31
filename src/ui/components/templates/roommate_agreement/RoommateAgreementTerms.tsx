import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { CardView } from "ui/components/atoms/CardView";
import { SPACE } from "config";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";

type Props = {};

const RoommateAgreementTerms: FC<Props> = () => {
  return (
    <CardView style={styles.cardView}>
      <View style={styles.innerCardView}>
        <HeadingWithText
          headingText={"Roommate Agreement Terms"}
          text={
            "We encourage you to discuss any issues with your roommate(s), as most disagreements can be resolved by discussing them openly and honestly. Your roommate(s) may think differently than you do, and usually do not realize that there is a problem if it is not discussed. Student staff members can help to facilitate the conversation with your roommate(s), as opposed to fixing the problem for you, which will help you and your roommate(s) create ways to communicate more effectively in regard to other matters."
          }
        />
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  innerCardView: {
    marginHorizontal: SPACE.lg,
    paddingTop: SPACE.xsm
  },
  cardView: {
    marginHorizontal: SPACE.lg,
    marginTop: SPACE.lg
  }
});

export default RoommateAgreementTerms;
