import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { UpdateProfileSectionFieldItem } from "ui/components/organisms/section_component/UpdateProfileSectionFieldItem";
import { ViewProfileSectionFieldItem } from "ui/components/organisms/section_component/ViewProfileSectionFieldItem";

type Props = {
  listData: FormInputFieldData[] | undefined;
  showProgressBar: boolean;
  updateProfile: boolean;
  roommateAgreement: boolean;
};

export const DynamicCardViewBody = React.memo<Props>(
  ({ listData, showProgressBar, updateProfile, roommateAgreement }) => {
    //const updateProfileRoute = useRoute<any>();
    const listItem = ({ item }: { item: FormInputFieldData }) => {
      if (roommateAgreement === true || updateProfile === true) {
        return <UpdateProfileSectionFieldItem item={item} />;
      } else {
        return <ViewProfileSectionFieldItem item={item} />;
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
