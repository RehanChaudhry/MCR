import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { DynamicCardViewItem } from "ui/components/templates/dynamic_card_view/DynamicCardViewItem";
import { SectionsType } from "models/api_responses/DynamicFormSections";

type Props = {
  sectionsData: SectionsType[] | undefined;
  showProgressBar?: boolean;
  updateProfile?: boolean;
  roommateAgreement?: boolean;
};

export const DynamicFormView = React.memo<Props>(
  ({
    sectionsData,
    showProgressBar,
    updateProfile,
    roommateAgreement
  }) => {
    const listItem = ({ item }: { item: SectionsType }) => {
      return (
        <DynamicCardViewItem
          section={item}
          showProgressBar={showProgressBar}
          updateProfile={updateProfile}
          roommateAgreement={roommateAgreement}
        />
      );
    };

    return (
      <View>
        <FlatListWithPb
          shouldShowProgressBar={showProgressBar ?? true}
          data={sectionsData}
          renderItem={listItem}
        />
      </View>
    );
  }
);
