import React from "react";
import { ScrollView, View } from "react-native";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";
import { ProfileData } from "models/api_responses/UpdateProfileUiResponseModel";
import { DynamicCardView } from "ui/components/templates/dynamic_card_view/DynamicCardView";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: ProfileData | undefined;
};

export const ViewProfileView: React.FC<Props> = ({
  openRoommateAgreementScreen,
  viewProfileUiData
}) => {
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicCardView sectionsData={viewProfileUiData?.sections} />
          <MyRoommates openAgreementScreen={openRoommateAgreementScreen} />
        </View>
      </ScrollView>
    </Screen>
  );
};
