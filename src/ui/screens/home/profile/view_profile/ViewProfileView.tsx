import { Profile } from "models/api_responses/FetchMyProfileResponseModel";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { DynamicFormView } from "ui/components/templates/dynamic_card_view/DynamicFormView";
import Roommates from "ui/components/organisms/roommates/Roommates";
import RelationModel from "models/RelationModel";
import { FONT_SIZE, SPACE } from "config";
import { AppLog, shadowStyleProps } from "utils/Util";
import InfoCircle from "assets/images/info_circle.svg";
import usePreferredTheme from "hooks/theme/usePreferredTheme";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import useAuth from "hooks/useAuth";

type Props = {
  openRoommateAgreementScreen: () => void;
  viewProfileUiData: Profile | undefined;
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
  roommates,
  moveToRoommateAgreementScreen,
  moveToChatScreenFromRommates,
  userName,
  showAgreementButton
}) => {
  AppLog.log(() => "Rommates: " + roommates);
  const { themedColors } = usePreferredTheme();
  const { user } = useAuth();

  return (
    <Screen shouldAddBottomInset={false}>
      <ScrollView>
        <View>
          <DynamicFormView
            sectionsData={viewProfileUiData?.sections}
            updateProfile={false}
          />
          {roommates &&
            roommates.length > 0 &&
            viewProfileUiData?.id === user?.profile?.id && (
              <Roommates
                style={styles.card}
                userName={userName?.split(" ")[0]}
                roommates={roommates}
                onChatClicked={moveToChatScreenFromRommates}
                onRoommateAgreementClicked={moveToRoommateAgreementScreen}
                showFooter={showAgreementButton}
              />
            )}

          {viewProfileUiData?.isEligible === false && (
            <View
              style={[
                styles.notEligibleContainer,
                { backgroundColor: themedColors.dangerShade }
              ]}>
              <InfoCircle width={20} fill={themedColors.danger} />
              <AppLabel
                text={"Not eligible for roommate request"}
                weight={"semi-bold"}
                style={[
                  styles.notEligible,
                  { color: themedColors.danger }
                ]}
              />
            </View>
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
  },
  notEligibleContainer: {
    flexDirection: "row",
    margin: SPACE.lg,
    padding: SPACE.md,

    borderRadius: 10
  },
  notEligible: {
    marginLeft: SPACE.sm,
    fontSize: FONT_SIZE.sm
  }
});
