import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { SectionsType } from "models/api_responses/DynamicFormSections";
import { SectionComponent } from "ui/components/organisms/section_component/SectionComponent";
import { StyleSheet } from "react-native";
import { SPACE } from "config";
import { useRoute } from "@react-navigation/native";

type DynamicCardViewItemProps = {
  sections: SectionsType;
};

export const DynamicCardViewItem = React.memo<DynamicCardViewItemProps>(
  ({ sections }) => {
    const updateProfileRoute = useRoute<any>();
    return (
      <CardView style={styles.cardView}>
        {updateProfileRoute.params.updateProfile === true && (
          <HeadingWithText
            headingFontWeight={"semi-bold"}
            headingText={sections.title}
            text={sections.description}
          />
        )}
        {updateProfileRoute.params.updateProfile === false && (
          <HeadingWithText
            headingFontWeight={"semi-bold"}
            headingText={
              sections.title === "Basic Profile"
                ? ""
                : sections.title
            }
            text={
              sections.title === "Basic Profile"
                ? ""
                : sections.description
            }
          />
        )}
        <SectionComponent
          listData={sections.formInputs}
          showProgressBar={true}
        />
      </CardView>
    );
  }
);

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.sm,
    marginTop: SPACE.sm,
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg
  }
});
