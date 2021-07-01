import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";
import Roommates from "ui/components/organisms/roommates/Roommates";
import RelationModel from "models/RelationModel";
import { SPACE } from "config";
import { AppLog, shadowStyleProps } from "utils/Util";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: Profile | undefined;
  moveToChatScreen: (userId: number) => void;
  roommates?: RelationModel[];
  moveToChatScreenFromRommates: (profileMatch: RelationModel) => void;
  moveToRoommateAgreementScreen: () => void;
  userName?: string;
  showAgreementButton: boolean;
};

export const ViewProfileView: React.FC<Props> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  openRoommateAgreementScreen,
  viewProfileUiData,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  moveToChatScreen,
  roommates,
  moveToRoommateAgreementScreen,
  moveToChatScreenFromRommates,
  userName,
  showAgreementButton
}) => {
  AppLog.logForcefully(() => "Rommates: " + roommates);
  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicFormView
            sectionsData={viewProfileUiData?.sections}
            updateProfile={false}
          />
          {roommates && roommates.length > 0 && (
            <Roommates
              style={styles.card}
              userName={userName?.split(" ")[0]}
              roommates={roommates}
              onChatClicked={moveToChatScreenFromRommates}
              onRoommateAgreementClicked={moveToRoommateAgreementScreen}
              showFooter={showAgreementButton}
            />
          )}
        </View>
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    marginHorizontal: SPACE.lg,
    marginBottom: SPACE.lg,
    ...shadowStyleProps
  }
});
