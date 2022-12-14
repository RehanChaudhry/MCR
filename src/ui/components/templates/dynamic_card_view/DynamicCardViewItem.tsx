import React, { useMemo } from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { SectionsType } from "models/api_responses/DynamicFormSections";
import { DynamicCardViewBody } from "ui/components/organisms/section_component/DynamicCardViewBody";
import { StyleSheet, View } from "react-native";
import { SPACE } from "config";
import { grayShades } from "hooks/theme/ColorPaletteContainer";

type DynamicCardViewItemProps = {
  section: SectionsType;
  showProgressBar?: boolean;
  updateProfile?: boolean;
  roommateAgreement?: boolean;
};

export const DynamicCardViewItem: React.FC<DynamicCardViewItemProps> = ({
  section,
  showProgressBar,
  updateProfile = false,
  roommateAgreement = false
}) => {
  // don't show section if there aren't fields in it
  let numberOfFieldsToShow = useMemo(
    () => section.formInputs?.filter((value) => value.isDefault === 0),
    [section.formInputs]
  );
  if (
    !updateProfile &&
    !roommateAgreement &&
    (!numberOfFieldsToShow || numberOfFieldsToShow.length === 0)
  ) {
    return null;
  }

  return (
    <CardView style={styles.cardView}>
      {/*//when update profile is open, then basic profile will be shown*/}
      {updateProfile === true && (
        <>
          <HeadingWithText
            headingFontWeight={"semi-bold"}
            headingText={section.title}
            text={section.description}
            headingStyle={{ marginBottom: SPACE.sm }}
          />

          <View style={styles.horizontalLine} />
        </>
      )}
      {/*//when view profile is open, basic profile will not be shown*/}
      {(updateProfile === false || roommateAgreement === true) && (
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={
            section.title === "Basic Profile" ? undefined : section.title
          }
          text={undefined}
        />
      )}
      <DynamicCardViewBody
        listData={section.formInputs}
        showProgressBar={showProgressBar ?? true}
        updateProfile={updateProfile}
        roommateAgreement={roommateAgreement}
      />
    </CardView>
  );
};

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xs,
    marginTop: SPACE.lg,
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg
  },
  horizontalLine: {
    backgroundColor: grayShades.warmGray["300"],
    height: 0.5,
    marginLeft: -SPACE.lg,
    marginRight: -SPACE.lg,
    marginTop: SPACE.lg,
    marginBottom: SPACE.lg
  }
});
