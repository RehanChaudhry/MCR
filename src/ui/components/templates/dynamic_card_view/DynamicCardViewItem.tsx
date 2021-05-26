import React from "react";
import { CardView } from "ui/components/atoms/CardView";
import { HeadingWithText } from "ui/components/molecules/heading_with_text/HeadingWithText";
import { SectionsType } from "models/api_responses/DynamicFormSections";
import { SectionComponent } from "ui/components/organisms/section_component/SectionComponent";
import { StyleSheet } from "react-native";
import { SPACE } from "config";

type DynamicCardViewItemProps = {
  sections: SectionsType;
};

export const DynamicCardViewItem = React.memo<DynamicCardViewItemProps>(
  ({ sections }) => {
    return (
      <CardView style={styles.cardView}>
        <HeadingWithText
          headingFontWeight={"semi-bold"}
          headingText={sections.title}
          text={sections.description}
        />
        <SectionComponent listData={sections.formInputs} />
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
