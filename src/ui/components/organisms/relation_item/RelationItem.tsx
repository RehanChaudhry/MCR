import Cross from "assets/images/ic_cross.svg";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import RelationModel from "models/RelationModel";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import MatchScore from "ui/components/molecules/match_score/MatchScore";
import { shadowStyleProps } from "utils/Util";
import getRelationStatus, {
  Eligible,
  RelationType
} from "utils/RelationHelper";
import RequestStateIcon from "assets/images/request_state_icon.svg";
import { ChatButton } from "ui/components/molecules/chat_button/ChatButton";
import useAuth from "hooks/useAuth";
import EScreen from "models/enums/EScreen";
import EIntBoolean from "models/enums/EIntBoolean";

interface Props {
  relationModel: RelationModel;
  isLoggedInUserAModerator: boolean;
  onCrossClicked?: (relationModel: RelationModel) => void;
  onChatButtonClicked: (relationModel: RelationModel) => void;
  onUserClicked: (relationModel: RelationModel) => void;
  isFromFriendsListing?: EScreen;
  onRoommateRequestActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onCancelRequestActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onFriendRequestReceivedActionButtonClicked?: (
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
  onRestoreDismissedActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
  onUnBlockedActionButtonClicked?: (relationModel: RelationModel) => void;
  onRoommateRequestReceivedActionButtonClicked?: (
    relationModel: RelationModel
  ) => void;
}

function createActionButton(
  relationModel: RelationModel,
  isLoggedInUserAModerator: boolean,
  themedColors: ColorPalette,
  onCancelRequestClicked?: (relationModel: RelationModel) => void,
  onRoommateRequestClicked?: (relationModel: RelationModel) => void,
  onFriendRequestReceivedClicked?: (relationModel: RelationModel) => void,
  onRoommateRequestReceivedClicked?: (
    relationModel: RelationModel
  ) => void,
  onFriendRequestClicked?: (relationModel: RelationModel) => void,
  onNotEligibleClicked?: (relationModel: RelationModel) => void,
  onRemoveRoommateActionButtonClicked?: (
    relationModel: RelationModel
  ) => void,
  onRestoreDismissedActionButtonClicked?: (
    relationModel: RelationModel
  ) => void,
  onUnBlockedActionButtonClicked?: (relationModel: RelationModel) => void,
  isFromFriendsListing?: EScreen
) {
  let actionButton: React.ReactElement;

  const {
    // user,
    userId,
    dismissed,
    criteria,
    isFriend,
    isRoommate,
    acceptee,
    status
  } = relationModel;

  // AppLog.logForcefully(
  //   () =>
  //     `name: ${user?.firstName}, id: ${userId}, acceptee: ${acceptee}, status: ${status}, dismissed: ${dismissed}, isFriend: ${isFriend}, isRoommate: ${isRoommate}`
  // );

  if (dismissed === 1) {
    actionButton = createRestoreButton();
  } else if (status === "blocked") {
    actionButton = createUnblockButton();
  } else if (
    isFriend === 1 &&
    isRoommate === 1 &&
    status === "accepted" &&
    isFromFriendsListing === EScreen.MY_FRIENDS
  ) {
    actionButton = createDisableButton();
  } else if (
    isFriend === 0 &&
    isRoommate === 0 &&
    (status === undefined || status === "rejected")
  ) {
    actionButton = createSendFriendRequestButton();
  } else if (isFriend === 0 && isRoommate === 0 && status === "pending") {
    if (acceptee === userId) {
      actionButton = createCancelRequestButton();
    } else {
      actionButton = createRequestReceivedButton(true);
    }
  } else if (
    isFriend === 1 &&
    isRoommate === 0 &&
    (status === undefined ||
      status === "rejected" ||
      status === "accepted")
  ) {
    if (criteria?.eligible) {
      actionButton = createSendRoommateRequestButton();
    } else {
      actionButton = createNotEligibleButton();
    }
  } else if (isFriend === 1 && isRoommate === 0 && status === "pending") {
    if (acceptee === userId) {
      actionButton = createCancelRequestButton();
    } else {
      actionButton = createRequestReceivedButton(false);
    }
  } else if (isFriend === 1 && isRoommate === 1) {
    actionButton = createRemoveRoommateButton();
  }

  return actionButton!;

  function createUnblockButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        onPress={() => {
          onUnBlockedActionButtonClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.primary }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.primaryShade }
        ]}
        text={STRINGS.matches.label_unblocked}
      />
    );
  }

  function createRestoreButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        onPress={() => {
          onRestoreDismissedActionButtonClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.primary }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.primaryShade }
        ]}
        text={STRINGS.matches.label_restore}
      />
    );
  }

  function createRemoveRoommateButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        onPress={() => {
          onRemoveRoommateActionButtonClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.danger }]}
        textDisableStyle={[
          styles.btnActionText,
          { color: themedColors.interface[600], opacity: 0.5 }
        ]}
        isDisable={!isLoggedInUserAModerator}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.dangerShade }
        ]}
        buttonDisableStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.interface[200] }
        ]}
        text={STRINGS.matches.label_remove_roommate}
      />
    );
  }

  function createDisableButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.danger }]}
        textDisableStyle={[
          styles.btnActionText,
          { color: themedColors.interface[600], opacity: 0.5 }
        ]}
        isDisable={true}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.dangerShade }
        ]}
        buttonDisableStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.interface[200] }
        ]}
        text={STRINGS.matches.label_roommate}
      />
    );
  }

  function createNotEligibleButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        onPress={() => {
          onNotEligibleClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.danger }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.dangerShade }
        ]}
        text={STRINGS.matches.label_not_eligible}
      />
    );
  }

  function createSendRoommateRequestButton(): React.ReactElement<
    any,
    string | React.JSXElementConstructor<any>
  > {
    return (
      <AppButton
        onPress={() => {
          onRoommateRequestClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.primary }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.primaryShade }
        ]}
        text={STRINGS.matches.label_roommate_request}
      />
    );
  }

  function createRequestReceivedButton(
    shouldMoveToFriendRequestReceivedScreen: boolean
  ) {
    return (
      <AppButton
        onPress={() => {
          (shouldMoveToFriendRequestReceivedScreen
            ? onFriendRequestReceivedClicked
            : onRoommateRequestReceivedClicked)?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.primary }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.primaryShade }
        ]}
        text={STRINGS.matches.label_request_received}
      />
    );
  }

  function createCancelRequestButton() {
    return (
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

  function createSendFriendRequestButton() {
    return (
      <AppButton
        onPress={() => {
          onFriendRequestClicked?.(relationModel);
        }}
        fontWeight={"semi-bold"}
        textStyle={[styles.btnActionText, { color: themedColors.primary }]}
        buttonStyle={[
          styles.btnAction,
          { backgroundColor: themedColors.primaryShade }
        ]}
        text={STRINGS.matches.action_add_friend}
      />
    );
  }
}

const RelationListsItem = ({
  relationModel,
  isLoggedInUserAModerator,
  onCrossClicked,
  onChatButtonClicked,
  onUserClicked,
  isFromFriendsListing,
  onRoommateRequestActionButtonClicked,
  onCancelRequestActionButtonClicked,
  onFriendRequestReceivedActionButtonClicked,
  onRoommateRequestReceivedActionButtonClicked,
  onFriendRequestActionButtonClicked,
  onNotEligibleActionButtonClicked,
  onRemoveRoommateActionButtonClicked,
  onRestoreDismissedActionButtonClicked,
  onUnBlockedActionButtonClicked
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const { relationType, eligible } = getRelationStatus(relationModel);
  const { uni } = useAuth();

  const [nameMargin, setNameMargin] = useState<boolean>(false);
  //AppLog.logForcefully(() => "displayprofile: " + uni?.displayMatch);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: themedColors.background }
      ]}>
      <View style={styles.infoContainer}>
        <Pressable
          onPress={() => {
            onUserClicked(relationModel);
          }}>
          {uni?.allowDisplayProfiles === EIntBoolean.TRUE ? (
            <Image
              style={styles.profileImage}
              source={
                relationModel.user?.profilePicture?.fileURL !== undefined
                  ? { uri: relationModel.user?.profilePicture?.fileURL }
                  : require("assets/images/profile.png")
              }
            />
          ) : (
            <Image
              style={styles.profileImage}
              source={require("assets/images/profile.png")}
            />
          )}
        </Pressable>
        <View style={styles.infoTextContainer}>
          <Pressable
            onPress={() => {
              onUserClicked(relationModel);
            }}>
            <AppLabel
              style={[
                styles.userName,
                nameMargin ? { marginRight: 55 } : { marginRight: 20 }
              ]}
              text={
                relationModel.user?.getFullName() ??
                STRINGS.common.not_found
              }
            />
            <AppLabel
              style={[
                styles.subtitle,
                { color: themedColors.interface[600] }
              ]}
              text={
                relationModel.user?.getSubtitle() ??
                STRINGS.common.not_available
              }
            />
          </Pressable>
          {uni?.displayMatch === 1 &&
            relationModel.matchScore !== undefined && (
              <MatchScore
                style={styles.matchScore}
                matchScore={`${relationModel.matchScore}%`}
              />
            )}
        </View>
      </View>
      <View style={styles.topEndButtons}>
        {relationType === RelationType.FRIEND && (
          <View
            onLayout={() => {
              setNameMargin(true);
            }}>
            <Pressable
              style={styles.icTopEndButtons}
              onPress={() => {
                onUserClicked(relationModel);
              }}>
              <RequestStateIcon
                fill={
                  eligible === Eligible.NOT_ELIGIBLE
                    ? themedColors.danger
                    : themedColors.success
                }
              />
            </Pressable>
          </View>
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
        <ChatButton
          containerStyle={styles.btnChat}
          onPress={() => {
            onChatButtonClicked(relationModel);
          }}
        />

        {createActionButton(
          relationModel,
          isLoggedInUserAModerator,
          themedColors,
          onCancelRequestActionButtonClicked,
          onRoommateRequestActionButtonClicked,
          onFriendRequestReceivedActionButtonClicked,
          onRoommateRequestReceivedActionButtonClicked,
          onFriendRequestActionButtonClicked,
          onNotEligibleActionButtonClicked,
          onRemoveRoommateActionButtonClicked,
          onRestoreDismissedActionButtonClicked,
          onUnBlockedActionButtonClicked,
          isFromFriendsListing
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
  userName: {
    fontSize: FONT_SIZE.lg,
    marginRight: 20,
    includeFontPadding: false
  },
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
