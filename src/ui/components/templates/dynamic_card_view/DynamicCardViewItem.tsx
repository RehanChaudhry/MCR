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
  showProgressBar?: boolean;
};

export const DynamicCardViewItem = React.memo<DynamicCardViewItemProps>(
  ({ sections, showProgressBar }) => {
    const updateProfileRoute = useRoute<any>();
    return (
      <CardView style={styles.cardView}>
        {/*//when update profile is open then basic profile will be shown*/}
        {updateProfileRoute.params.updateProfile === true && (
          <HeadingWithText
            headingFontWeight={"semi-bold"}
            headingText={sections.title}
            text={sections.description}
          />
        )}
        {/*//when view profile is open basic profile will not be shown*/}
        {updateProfileRoute.params.updateProfile === false && (
          <HeadingWithText
            headingFontWeight={"semi-bold"}
            headingText={
              sections.title === "Basic Profile"
                ? undefined
                : sections.title
            }
            text={
              sections.title === "Basic Profile"
                ? undefined
                : sections.description
            }
          />
        )}
        <SectionComponent
          listData={sections.formInputs}
          showProgressBar={showProgressBar ?? true}
        />
      </CardView>
    );
  }
);

const styles = StyleSheet.create({
  cardView: {
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.xs,
    marginTop: SPACE.lg,
    paddingVertical: SPACE.lg,
    paddingHorizontal: SPACE.lg
  }
});
