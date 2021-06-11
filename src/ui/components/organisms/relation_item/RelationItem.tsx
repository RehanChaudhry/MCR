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
import RequestStateIcon from "assets/images/request_state_icon.svg";

interface Props {
  relationModel: RelationModel;
  onCrossClicked?: (relationModel: RelationModel) => void;
  onChatButtonClicked: (relationModel: RelationModel) => void;
  onImageClicked: (relationModel: RelationModel) => void;
  onRoommateRequestActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onCancelRequestActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onRequestReceivedActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onFriendRequestActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onNotEligibleActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onRemoveRoommateActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
}

function createActionButton(
  relationModel: RelationModel,
  themedColors: ColorPalette,
  onCancelRequestClicked?: (relationModel: RelationModel) => void,
  onRoommateRequestClicked?: (relationModel: RelationModel) => void,
  onRequestReceivedClicked?: (relationModel: RelationModel) => void,
  onFriendRequestClicked?: (relationModel: RelationModel) => void,
  onNotEligibleClicked?: (relationModel: RelationModel) => void,
  onRemoveRoommateActionButtonClicked?: (
    relationModel: RelationModel
  ) => void
) {
  let actionButton: React.ReactElement;
  const { relationType, actionPerformed, eligible } = getRelationStatus(
    relationModel
  );

  if (relationType === RelationType.NONE) {
    if (actionPerformed === ActionPerformed.NONE) {
      actionButton = (
        <AppButton
          onPress={() => {
            onFriendRequestClicked?.(relationModel);
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
            onCancelRequestClicked?.(relationModel);
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
              onNotEligibleClicked?.(relationModel);
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
              onRoommateRequestClicked?.(relationModel);
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
            onRequestReceivedClicked?.(relationModel);
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
            onCancelRequestClicked?.(relationModel);
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
  } else if (relationType === RelationType.ROOMMATE) {
    actionButton = (
      <AppButton
        onPress={() => {
          onRemoveRoommateActionButtonClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.danger }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.dangerShade }
        ]}
        text={STRINGS.matches.label_remove_roommate}
      />
    );
  }

  return actionButton!;
}

const RelationListsItem = ({
  relationModel,
  onCrossClicked,
  onChatButtonClicked,
  onImageClicked,
  onRoommateRequestActionButtonClicked,
  onCancelRequestActionButtonClicked,
  onRequestReceivedActionButtonClicked,
  onFriendRequestActionButtonClicked,
  onNotEligibleActionButtonClicked,
  onRemoveRoommateActionButtonClicked
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const { relationType, eligible } = getRelationStatus(relationModel);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}>
      <View style={styles.infoContainer}>
        <Pressable
          onPress={() => {
            onImageClicked(relationModel);
          }}>
          <Image
            style={styles.profileImage}
            source={{ uri: relationModel.user?.profilePicture?.fileURL }}
          />
        </Pressable>
        <View style={styles.infoTextContainer}>
          <AppLabel
            style={styles.userName}
            text={
              relationModel.user?.getFullName() ?? STRINGS.common.not_found
            }
          />
          <AppLabel
            style={[
              styles.subtitle,
              { color: themedColors.interface[600] }
            ]}
            text={relationModel.user?.getSubtitle()}
          />
          {relationModel.matchScore !== undefined && (
            <MatchScore
              style={styles.matchScore}
              matchScore={`${relationModel.matchScore}%`}
            />
          )}
        </View>
      </View>
      <View style={styles.topEndButtons}>
        {relationType === RelationType.FRIEND && (
          <Pressable
            style={styles.icTopEndButtons}
            onPress={() => {
              onImageClicked(relationModel);
            }}>
            <RequestStateIcon
              fill={
                eligible === Eligible.NOT_ELIGIBLE
                  ? themedColors.danger
                  : themedColors.success
              }
            />
          </Pressable>
        )}
        {onCrossClicked !== undefined && (
          <Pressable
            style={styles.icTopEndButtons}
            onPress={() => {
              onCrossClicked(relationModel);
            }}>
            <Cross
              fill={themedColors.interface[400]}
              width={moderateScale(20)}
              height={moderateScale(20)}
            />
          </Pressable>
        )}
      </View>
      <View style={styles.buttonContainer}>
        <AppImageBackground
          onPress={() => {
            onChatButtonClicked(relationModel);
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
          relationModel,
          themedColors,
          onCancelRequestActionButtonClicked,
          onRoommateRequestActionButtonClicked,
          onRequestReceivedActionButtonClicked,
          onFriendRequestActionButtonClicked,
          onNotEligibleActionButtonClicked,
          onRemoveRoommateActionButtonClicked
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
  icTopEndButtons: {
    padding: SPACE.xs
  },
  topEndButtons: {
    flexDirection: "row",
    position: "absolute",
    top: SPACE._2xs,
    end: SPACE._2xs
  }
});

export default RelationListsItem;
