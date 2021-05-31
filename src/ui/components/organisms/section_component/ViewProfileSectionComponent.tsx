import React from "react";
import { View } from "react-native";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FormInputFieldData } from "models/api_responses/RoommateAgreementResponseModel";
import { AppLog } from "utils/Util";
import { CustomViewProfileItems } from "ui/components/organisms/section_component/CustomViewProfiletems";

type Props = {
  listData: any[] | undefined;
  showProgressBar?: boolean;
};

export const ViewProfileSectionComponent = React.memo<Props>(
  ({ listData, showProgressBar }) => {
    AppLog.logForcefully("creating element " + JSON.stringify(listData));

    const listItem = ({ item }: { item: FormInputFieldData }) => {
      return <CustomViewProfileItems listData={item} />;
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
