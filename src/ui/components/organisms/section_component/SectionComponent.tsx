import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import CustomFormFieldItem from "ui/components/organisms/section_component/CustomFormFieldItem";
import { AppLog } from "utils/Util";
import { useRoute } from "@react-navigation/native";
import { CustomViewProfileItems } from "ui/components/organisms/section_component/CustomViewProfiletems";

type Props = {
  listData: FormInputFieldData[] | undefined;
  showProgressBar: boolean;
};

export const SectionComponent = React.memo<Props>(
  ({ listData, showProgressBar }) => {
    const updateProfileRoute = useRoute<any>();

    AppLog.logForcefully("creating element " + JSON.stringify(listData));
    const listItem = ({ item }: { item: FormInputFieldData }) => {
      if (updateProfileRoute.params.updateProfile === true) {
        return <CustomFormFieldItem listData={item} />;
      } else {
        return <CustomViewProfileItems listData={item} />;
      }
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
