import React from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { CardView } from "ui/components/atoms/CardView";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { LinkButton } from "ui/components/molecules/link_button/LinkButton";
import Lock from "assets/images/lock-closed.svg";
import Calender from "assets/images/calendar.svg";
import UserGroup from "assets/images/user-group.svg";
import DownArrow from "assets/images/download.svg";
import moment from "moment";
import {
  AppButton,
  BUTTON_TYPES
} from "ui/components/molecules/app_button/AppButton";
import Screen from "ui/components/atoms/Screen";
import { AgreementDetailsListItem } from "ui/components/molecules/agreement_details_item/AgreementDetailsListItem";
import { AgreementData } from "models/api_responses/AgreementAnswerResponseModel";
import { RoommateAgreementParty } from "models/api_requests/GetAgreementApi";

type Props = {
  agreementDetailsData: AgreementData;
  moveToChatScreen: (
    roommateAgreementParties: RoommateAgreementParty
  ) => void;
};

export const AgreementDetailsView = React.memo<Props>(
  ({ agreementDetailsData, moveToChatScreen }) => {
    const theme = usePreferredTheme();
    const listItem = ({ item }: { item: RoommateAgreementParty }) => {
      return (
        <AgreementDetailsListItem
          username={item.firstName + " " + item.lastName}
          status={item.status}
          updateAt={moment(item.submittedAt).format("MMM DD, YYYY")}
          profileUrl={item.profilePicture?.fileURL}
          roommateAgreementParties={item}
          moveToChatScreen={moveToChatScreen}
        />
      );
    };

    return (
      <Screen>
        <ScrollView>
          <CardView style={styles.cardView}>
            <AppLabel
              text={
                "Room Agreement Parties (" +
                agreementDetailsData.roommateAgreementParties?.length +
                ")"
              }
              weight={"semi-bold"}
              style={styles.heading}
            />
            <FlatList
              data={agreementDetailsData.roommateAgreementParties}
              keyExtractor={(item) => item.userID?.toString()}
              renderItem={listItem}
              ItemSeparatorComponent={() => (
                <View
                  style={[
                    styles.itemSeparator,
                    {
                      backgroundColor: theme.themedColors.interface["300"]
                    }
                  ]}
                />
              )}
            />
          </CardView>

          <CardView style={styles.cardView}>
            <AppLabel
              text={"Approval Information"}
              weight={"semi-bold"}
              style={styles.heading}
            />

            <View style={styles.approvalInfo}>
              <LinkButton
                text={"Approval Status"}
                fontWeight={"semi-bold"}
                leftIcon={() => (
                  <Lock
                    width={18}
                    height={18}
                    fill={theme.themedColors.interface["700"]}
                  />
                )}
                textStyle={[
                  styles.approvalTexts,
                  {
                    color: theme.themedColors.interface["700"]
                  }
                ]}
              />

              <AppLabel
                text={
                  agreementDetailsData.approvalInformation?.approvalStatus
                }
                style={styles.pending}
              />

              <View
                style={[
                  styles.itemSeparatorApproval,
                  {
                    backgroundColor: theme.themedColors.interface["300"]
                  }
                ]}
              />
            </View>

            <View style={styles.approvalInfo}>
              <LinkButton
                text={"Approval Date"}
                fontWeight={"semi-bold"}
                leftIcon={() => (
                  <Calender
                    width={18}
                    height={18}
                    fill={theme.themedColors.interface["700"]}
                  />
                )}
                textStyle={[
                  styles.approvalTexts,
                  {
                    color: theme.themedColors.interface["700"]
                  }
                ]}
              />

              <AppLabel
                text={
                  agreementDetailsData.approvalInformation?.approvalDate ??
                  "N/A"
                }
                style={styles.pending}
              />

              <View
                style={[
                  styles.itemSeparatorApproval,
                  {
                    backgroundColor: theme.themedColors.interface["300"]
                  }
                ]}
              />
            </View>

            <View style={styles.approvalInfo}>
              <LinkButton
                text={"Approved By"}
                fontWeight={"semi-bold"}
                leftIcon={() => (
                  <UserGroup
                    width={18}
                    height={18}
                    fill={theme.themedColors.interface["700"]}
                  />
                )}
                textStyle={[
                  styles.approvalTexts,
                  {
                    color: theme.themedColors.interface["700"]
                  }
                ]}
              />

              <AppLabel
                text={
                  agreementDetailsData.approvalInformation?.approvalDate ??
                  "N/A"
                }
                style={styles.pending}
              />

              <View
                style={[
                  styles.itemSeparatorApproval,
                  {
                    backgroundColor: theme.themedColors.interface["300"]
                  }
                ]}
              />

              <AppButton
                text={STRINGS.roommateAgreementDetails.export_agreement}
                buttonStyle={[
                  styles.exportRoommateAgreement,
                  {
                    backgroundColor: theme.themedColors.background
                  }
                ]}
                textStyle={[
                  styles.buttonText,
                  { color: theme.themedColors.interface["700"] }
                ]}
                fontWeight={"semi-bold"}
                buttonType={BUTTON_TYPES.BORDER}
                leftIcon={() => (
                  <DownArrow
                    width={16}
                    height={16}
                    fill={theme.themedColors.interface["700"]}
                  />
                )}
              />
            </View>
          </CardView>
        </ScrollView>
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  itemSeparator: {
    width: "100%",
    height: 0.5
  },
  itemSeparatorApproval: {
    width: "100%",
    height: 0.5,
    marginTop: SPACE.md
  },
  cardView: { padding: SPACE.lg, margin: SPACE.lg },
  heading: { fontSize: FONT_SIZE.base },
  pending: {
    marginTop: SPACE.sm
  },
  exportRoommateAgreement: {
    marginVertical: SPACE.sm
  },
  buttonText: {
    fontSize: FONT_SIZE.base
  },
  approvalInfo: {
    marginTop: SPACE.lg
  },
  approvalTexts: {
    fontSize: FONT_SIZE.sm
  }
});
