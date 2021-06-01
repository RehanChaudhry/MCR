import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel, { Status } from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { MyFriendsContext } from "ui/screens/home/friends/AppDataProvider";
import useSendFriendOrRoommateRequest from "ui/screens/home/friends/useSendFriendOrRoommateRequest";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";

export enum Type {
  FRIEND_REQUEST = "friend_request",
  FRIENDS_ROOMMATE_REQUEST = "friends_roommate_request",
  MATCHES_ROOMMATE_REQUEST = "matches_roommate_request",
  CANCEL = "cancel",
  UNFRIEND = "unfriend"
}

type Props = {
  title?: string;
  message?: string;
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
  type: Type;
  firstButtonText?: string;
  secondButtonText?: string;
};

const TwoButtonsAlert: FC<Props> = React.memo(
  ({
    shouldShow,
    getSelectedItem,
    hideSelf,
    type,
    title = "Roommate Request",
    message = `Are you sure you want to send roommate request to ${
      getSelectedItem()?.user?.getFullName() ?? "N/A"
    }?`,
    firstButtonText = "Yes, send request",
    secondButtonText = null
  }) => {
    const theme = usePreferredTheme();

    const {
      myFriends,
      setMyFriends,
      matches,
      setMatches,
      resetData
    } = useContext(MyFriendsContext);

    const changedMyFriendStatus = useCallback(
      (friend: RelationModel | undefined, status?: Status) => {
        if (!myFriends || !friend) {
          return;
        }

        let _myFriends = [...myFriends];
        let index = _myFriends.findIndex(
          (value) => value.id === friend.id
        );
        let updatedFriend: RelationModel = Object.assign(
          Object.create(friend),
          friend
        );
        updatedFriend.status = status;
        _myFriends.splice(index, 1, updatedFriend);

        setMyFriends?.(_myFriends);
      },
      [myFriends, setMyFriends]
    );

    const changeMatchesStatus = useCallback(
      (match: RelationModel | undefined, status?: Status) => {
        if (!matches || !match) {
          return;
        }

        let _matches = [...matches];
        let index = _matches.findIndex((value) => value.id === match.id);
        let updatedMatch: RelationModel = Object.assign(
          Object.create(match),
          match
        );
        updatedMatch.status = status;
        _matches.splice(index, 1, updatedMatch);

        setMatches?.(_matches);
      },
      [matches, setMatches]
    );

    const onFriendRemoved = useCallback(
      (id: number) => {
        setMyFriends?.(myFriends?.filter((value) => value.id !== id));
        resetData();
      },
      [myFriends, setMyFriends, resetData]
    );

    const { shouldShowPb, sendRequest } = useSendFriendOrRoommateRequest(
      "Unable to send friend request",
      hideSelf,
      () => {
        if (type === Type.FRIENDS_ROOMMATE_REQUEST) {
          changedMyFriendStatus(getSelectedItem(), Status.PENDING);
        } else {
          changeMatchesStatus(getSelectedItem(), Status.PENDING);
        }
      }
    );

    const getTypeForUpdateRelation = () => {
      if (type === Type.CANCEL) {
        return "cancel";
      } else {
        return "unfriend";
      }
    };

    //for cancel, dismissed and block match
    const {
      shouldShowPb: shouldShowRelationUpdatePb,
      updateRelation
    } = useUpdateRelation(
      getTypeForUpdateRelation(),
      "Unable to cancel request",
      hideSelf,
      () => {
        if (type === Type.CANCEL) {
          changeMatchesStatus(getSelectedItem(), undefined);
        } else {
          onFriendRemoved(getSelectedItem()?.id ?? -1);
        }
      }
    );

    return (
      <AppPopUp
        isVisible={shouldShow}
        title={title}
        message={message}
        customActionButtons={
          <View>
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
            />
            <AppButton
              text={firstButtonText}
              style={styles.actionContainer}
              shouldShowProgressBar={
                type === Type.FRIEND_REQUEST ||
                type === Type.FRIENDS_ROOMMATE_REQUEST ||
                type === Type.MATCHES_ROOMMATE_REQUEST
                  ? shouldShowPb
                  : shouldShowRelationUpdatePb
              }
              onPress={() => {
                if (
                  type === Type.FRIEND_REQUEST ||
                  type === Type.FRIENDS_ROOMMATE_REQUEST ||
                  type === Type.MATCHES_ROOMMATE_REQUEST
                ) {
                  sendRequest(getSelectedItem());
                } else if (
                  type === Type.CANCEL ||
                  type === Type.UNFRIEND
                ) {
                  updateRelation(getSelectedItem());
                }
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color:
                    secondButtonText !== null
                      ? theme.themedColors.warn
                      : theme.themedColors.primary,
                  textAlign: "center",
                  fontSize: FONT_SIZE.base
                }
              ]}
              fontWeight="semi-bold"
            />
            <AppButton
              text="Cancel"
              style={styles.actionContainer}
              onPress={() => {
                hideSelf();
              }}
              textStyle={[
                styles.actionStyle,
                {
                  color: theme.themedColors.label,
                  fontSize: FONT_SIZE.base
                }
              ]}
            />
          </View>
        }
      />
    );
  }
);

const styles = StyleSheet.create({
  actionStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.lg
  },
  actionContainer: {
    padding: SPACE.md
  },
  separator: {
    height: 0.5
  }
});
export default TwoButtonsAlert;
