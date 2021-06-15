import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { UpdateProfileSectionFieldItem } from "ui/components/organisms/section_component/UpdateProfileSectionFieldItem";
import { useRoute } from "@react-navigation/native";
import { ViewProfileSectionFieldItem } from "ui/components/organisms/section_component/ViewProfileSectionFieldItem";

type Props = {
  listData: FormInputFieldData[] | undefined;
  showProgressBar: boolean;
};

export const SectionComponent = React.memo<Props>(
  ({ listData, showProgressBar }) => {
    const updateProfileRoute = useRoute<any>();
    const listItem = ({ item }: { item: FormInputFieldData }) => {
      if (
        updateProfileRoute.params.updateProfile === undefined ||
        updateProfileRoute.params.updateProfile === true
      ) {
        return <UpdateProfileSectionFieldItem listData={item} />;
      } else {
        return <ViewProfileSectionFieldItem listData={item} />;
      }
    };

    return (
      <View>
        <FlatListWithPb
          shouldShowProgressBar={showProgressBar}
          data={listData}
          renderItem={listItem}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    );
  }
);
