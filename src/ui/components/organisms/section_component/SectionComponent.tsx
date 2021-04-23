import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { RoommateData } from "models/api_responses/RoommateAgreementResponseModel";
import CustomFormFieldItem from "ui/components/organisms/section_component/CustomFormFieldItem";

type Props = {
  listData: RoommateData[] | undefined;
};

export const SectionComponent = React.memo<Props>(({ listData }) => {
  const listItem = ({ item }: { item: RoommateData }) => {
    return <CustomFormFieldItem listData={item} />;
  };

  return (
    <View>
      <FlatListWithPb
        shouldShowProgressBar={true}
        data={listData}
        renderItem={listItem}
      />
    </View>
  );
});
