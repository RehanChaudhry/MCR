import ChatRound from "assets/images/chat_round.svg";
import Cross from "assets/images/ic_cross.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
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
  onCrossClicked: (profileMatch: RelationModel) => void;
  onChatButtonClicked: (profileMatch: RelationModel) => void;
  onImageClicked: (profileMatch: RelationModel) => void;
  onRoommateRequestClicked: (profileMatch: RelationModel) => void;
  onCancelRequestClicked: (profileMatch: RelationModel) => void;
  onRequestReceivedClicked: (profileMatch: RelationModel) => void;
  onFriendRequestClicked?: (profileMatch: RelationModel) => void;
  onNotEligibleClicked?: (profileMatch: RelationModel) => void;
}

function createActionButton(
  profileMatch: RelationModel,
  themedColors: ColorPalette,
  onCancelRequestClicked: (profileMatch: RelationModel) => void,
  onRoommateRequestClicked: (profileMatch: RelationModel) => void,
  onRequestReceivedClicked: (profileMatch: RelationModel) => void,
  onFriendRequestClicked?: (profileMatch: RelationModel) => void,
  onNotEligibleClicked?: (profileMatch: RelationModel) => void
) {
  let actionButton: React.ReactElement;
  const { relationType, actionPerformed, eligible } = getRelationStatus(
    profileMatch
  );

  if (relationType === RelationType.NONE) {
    if (actionPerformed === ActionPerformed.NONE) {
      actionButton = (
        <AppButton
          onPress={() => {
            onFriendRequestClicked?.(profileMatch);
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
            onCancelRequestClicked(profileMatch);
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
            onPress={() => {
              onNotEligibleClicked?.(profileMatch);
            }}
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
              onRoommateRequestClicked(profileMatch);
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
            onRequestReceivedClicked(profileMatch);
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
            onCancelRequestClicked(profileMatch);
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

  return actionButton!;
}

const ProfileMatchItem = ({
  profileMatch,
  onCrossClicked,
  onChatButtonClicked,
  onImageClicked,
  onRoommateRequestClicked,
  onCancelRequestClicked,
  onRequestReceivedClicked,
  onFriendRequestClicked,
  onNotEligibleClicked
}: Props) => {
  const { themedColors } = usePreferredTheme();

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
          {profileMatch.matchScore && (
            <MatchScore
              style={styles.matchScore}
              matchScore={`${profileMatch.matchScore}%`}
            />
          )}
        </View>
      </View>
      <Pressable
        style={styles.icCross}
        onPress={() => {
          onCrossClicked(profileMatch);
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
        {createActionButton(
          profileMatch,
          themedColors,
          onCancelRequestClicked,
          onRoommateRequestClicked,
          onRequestReceivedClicked,
          onFriendRequestClicked,
          onNotEligibleClicked
        )}
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
