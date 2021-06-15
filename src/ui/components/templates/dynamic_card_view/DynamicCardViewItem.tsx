import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { SectionsType } from "models/api_responses/DynamicFormSections";
import { DynamicCardViewBody } from "ui/components/organisms/section_component/DynamicCardViewBody";
import { StyleSheet } from "react-native";
import { SPACE } from "config";
import { useRoute } from "@react-navigation/native";

type DynamicCardViewItemProps = {
  section: SectionsType;
  showProgressBar?: boolean;
};

export const DynamicCardViewItem: React.FC<DynamicCardViewItemProps> = ({
  section,
  showProgressBar
}) => {
  const updateProfileRoute = useRoute<any>();
  return (
    <CardView style={styles.cardView}>
      {/*//when update profile is open then basic profile will be shown*/}
      {updateProfileRoute.params.updateProfile === true && (
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={section.title}
          text={section.description}
        />
      )}
      {/*//when view profile is open basic profile will not be shown*/}
      {updateProfileRoute.params.updateProfile === false && (
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={
            section.title === "Basic Profile" ? undefined : section.title
          }
          text={
            section.title === "Basic Profile"
              ? undefined
              : section.description
          }
        />
      )}
      <DynamicCardViewBody
        listData={section.formInputs}
        showProgressBar={showProgressBar ?? true}
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
  }
});
