import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import CustomFormFieldItem from "ui/components/organisms/section_component/CustomFormFieldItem";
import { AppLog } from "utils/Util";

type Props = {
  listData: any[] | undefined;
  showProgressBar: boolean;
};

export const SectionComponent = React.memo<Props>(
  ({ listData, showProgressBar }) => {
    AppLog.logForcefully("creating element " + JSON.stringify(listData));

    const listItem = ({ item }: { item: FormInputFieldData }) => {
      return <CustomFormFieldItem listData={item} />;
    };

    return (
      <View>
        <FlatListWithPb
          shouldShowProgressBar={showProgressBar}
          data={listData}
          renderItem={listItem}
        />
      </View>
    );
  }
);
