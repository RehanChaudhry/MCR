import React from "react";
import { ScrollView, View } from "react-native";
import MyRoommates from "ui/components/templates/my_roommates/MyRoommates";
import Screen from "ui/components/atoms/Screen";
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";
import { Profile } from "models/api_responses/FetchMyProfileResponseModel";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: Profile | undefined;
  moveToChatScreen: (userId: number) => void;
};

export const ViewProfileView: React.FC<Props> = ({
  openRoommateAgreementScreen,
  viewProfileUiData,
  moveToChatScreen
}) => {
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicFormView sectionsData={viewProfileUiData?.sections} />
          <MyRoommates
            openAgreementScreen={openRoommateAgreementScreen}
            moveToChatScreen={moveToChatScreen}
          />
        </View>
      </ScrollView>
    </Screen>
  );
};
