import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import React from "react";
import { ScrollView, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: Profile | undefined;
  moveToChatScreen: (userId: number) => void;
};

export const ViewProfileView: React.FC<Props> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openRoommateAgreementScreen,
  viewProfileUiData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveToChatScreen
}) => {
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicFormView sectionsData={viewProfileUiData?.sections} />
          {/*<MyRoommatesController />*/}
        </View>
      </ScrollView>
    </Screen>
  );
};
