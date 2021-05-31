import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { DynamicCardViewItem } from "ui/components/templates/dynamic_card_view/DynamicCardViewItem";
import { SectionsType } from "models/api_responses/DynamicFormSections";

type Props = {
  sectionsData: SectionsType[] | undefined;
};

export const DynamicCardView = React.memo<Props>(({ sectionsData }) => {
  const listItem = ({ item }: { item: SectionsType }) => {
    return <DynamicCardViewItem sections={item} />;
  };

  return (
    <View>
      <FlatListWithPb
        shouldShowProgressBar={true}
        data={sectionsData}
        renderItem={listItem}
      />
    </View>
  );
});
