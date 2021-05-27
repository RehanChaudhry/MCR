import ChatRound from "assets/images/chat_round.svg";
import Cross from "assets/images/ic_cross.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import {
  AppImageBackground,
  CONTAINER_TYPES
} from "ui/components/atoms/image_background/AppImageBackground";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import MatchScore from "ui/components/molecules/match_score/MatchScore";
import { shadowStyleProps } from "utils/Util";
import getRelationStatus, {
  ActionPerformed,
  Eligible,
  RelationType
} from "utils/RelationHelper";

interface Props {
  profileMatch: RelationModel;
  isFriendRequestApiLoading: boolean;
  onFriendRequestClicked: (userId: number) => void;
  onCrossClicked: (userId: number) => void;
  onChatButtonClicked: (profileMatch: RelationModel) => void;
  onImageClicked: (profileMatch: RelationModel) => void;
  onRoommateRequestClicked: (userId: number) => void;
  onCancelRequestClicked: (userId: number) => void;
  onRequestReceivedClicked: (userId: number) => void;
}

const ProfileMatchItem = ({
  profileMatch,
  isFriendRequestApiLoading,
  onFriendRequestClicked,
  onCrossClicked,
  onChatButtonClicked,
  onImageClicked,
  onRoommateRequestClicked,
  onCancelRequestClicked,
  onRequestReceivedClicked
}: Props) => {
  const { themedColors } = usePreferredTheme();

  function getActionButton() {
    let actionButton: React.ReactElement;
    getRelationStatus(
      profileMatch,
      (relationType, actionPerformed, eligible) => {
        if (relationType === RelationType.NONE) {
          if (actionPerformed === ActionPerformed.NONE) {
            actionButton = (
              <AppButton
                shouldShowProgressBar={isFriendRequestApiLoading}
                onPress={() => {
                  onFriendRequestClicked(profileMatch.userId);
                }}
                fontWeight={"semi-bold"}
                textStyle={[
                  styles.btnActionText,
                  { color: themedColors.primary }
                ]}
                buttonStyle={[
                  styles.btnAction,
                  { backgroundColor: themedColors.primaryShade }
                ]}
                text={STRINGS.matches.action_add_friend}
              />
            );
          } else {
            actionButton = (
              <AppButton
                onPress={() => {
                  onCancelRequestClicked(profileMatch.userId);
                }}
                fontWeight={"semi-bold"}
                textStyle={[
                  styles.btnActionText,
                  { color: themedColors.interface[500] }
                ]}
                buttonStyle={[
                  styles.btnAction,
                  { backgroundColor: themedColors.interface[200] }
                ]}
                text={STRINGS.matches.label_cancel_request}
              />
            );
          }
        } else if (relationType === RelationType.FRIEND) {
          if (actionPerformed === ActionPerformed.NONE) {
            if (eligible === Eligible.NOT_ELIGIBLE) {
              actionButton = (
                <AppButton
                  isDisable={true}
                  fontWeight={"semi-bold"}
                  textStyle={[
                    styles.btnActionText,
                    { color: themedColors.danger }
                  ]}
                  buttonStyle={[
                    styles.btnAction,
                    { backgroundColor: themedColors.dangerShade }
                  ]}
                  text={STRINGS.matches.label_not_eligible}
                />
              );
            } else {
              actionButton = (
                <AppButton
                  onPress={() => {
                    onRoommateRequestClicked(profileMatch.userId);
                  }}
                  fontWeight={"semi-bold"}
                  textStyle={[
                    styles.btnActionText,
                    { color: themedColors.primary }
                  ]}
                  buttonStyle={[
                    styles.btnAction,
                    { backgroundColor: themedColors.primaryShade }
                  ]}
                  text={STRINGS.matches.label_roommate_request}
                />
              );
            }
          } else if (
            actionPerformed === ActionPerformed.ROOMMATE_REQUESTED_RECEIVED
          ) {
            actionButton = (
              <AppButton
                onPress={() => {
                  onRequestReceivedClicked(profileMatch.userId);
                }}
                fontWeight={"semi-bold"}
                textStyle={[
                  styles.btnActionText,
                  { color: themedColors.primary }
                ]}
                buttonStyle={[
                  styles.btnAction,
                  { backgroundColor: themedColors.primaryShade }
                ]}
                text={STRINGS.matches.label_request_received}
              />
            );
          } else {
            actionButton = (
              <AppButton
                onPress={() => {
                  onCancelRequestClicked(profileMatch.userId);
                }}
                fontWeight={"semi-bold"}
                textStyle={[
                  styles.btnActionText,
                  { color: themedColors.interface[500] }
                ]}
                buttonStyle={[
                  styles.btnAction,
                  { backgroundColor: themedColors.interface[200] }
                ]}
                text={STRINGS.matches.label_cancel_request}
              />
            );
          }
        }
      }
    );
    return actionButton!;
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}>
      <View style={styles.infoContainer}>
        <Pressable
          onPress={() => {
            onImageClicked(profileMatch);
          }}>
          <Image
            style={styles.profileImage}
            source={{ uri: profileMatch.user?.profilePicture?.fileURL }}
          />
        </Pressable>
        <View style={styles.infoTextContainer}>
          <AppLabel
            style={styles.userName}
            text={
              profileMatch.user?.getFullName() ?? STRINGS.common.not_found
            }
          />
          <AppLabel
            style={[
              styles.subtitle,
              { color: themedColors.interface[600] }
            ]}
            text={profileMatch.user?.getSubtitle()}
          />
          <MatchScore
            style={styles.matchScore}
            matchScore={
              profileMatch.matchScore
                ? `${profileMatch.matchScore}%`
                : STRINGS.common.not_found
            }
          />
        </View>
      </View>
      <Pressable
        style={styles.icCross}
        onPress={() => {
          onCrossClicked(profileMatch.userId);
        }}>
        <Cross
          fill={themedColors.interface[400]}
          width={moderateScale(20)}
          height={moderateScale(20)}
        />
      </Pressable>
      <View style={styles.buttonContainer}>
        <AppImageBackground
          onPress={() => {
            onChatButtonClicked(profileMatch);
          }}
          containerStyle={styles.btnChat}
          containerShape={CONTAINER_TYPES.SQUARE}
          icon={() => (
            <ChatRound
              fill={themedColors.interface[800]}
              width={moderateScale(24)}
              height={moderateScale(24)}
            />
          )}
        />
        {getActionButton()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    borderRadius: 12,
    padding: SPACE.md,
    ...shadowStyleProps
  },
  infoContainer: {
    flexDirection: "row"
  },
  profileImage: {
    width: 64,
    height: 64,
    borderRadius: 32
  },
  infoTextContainer: {
    marginStart: SPACE.md,
    flex: 1
  },
  userName: { fontSize: FONT_SIZE.lg, includeFontPadding: false },
  subtitle: { fontSize: FONT_SIZE.xs, marginTop: SPACE._2xs },
  matchScore: {
    marginTop: SPACE.md,
    alignSelf: "baseline"
  },
  buttonContainer: {
    flexDirection: "row-reverse",
    marginTop: SPACE.md
  },
  btnActionText: {
    fontSize: FONT_SIZE.sm
  },
  btnAction: {
    alignSelf: "stretch",
    height: 36,
    flex: 1
  },
  btnChat: {
    marginLeft: SPACE.md,
    height: 36,
    width: 36
  },
  icCross: {
    position: "absolute",
    top: SPACE._2xs,
    end: SPACE._2xs,
    padding: SPACE.xs
  }
});

export default ProfileMatchItem;
