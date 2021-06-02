import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { UpdateRelationStatus } from "models/api_requests/UpdateRelationApiRequestModel";
import RelationModel, { Status } from "models/RelationModel";
import React, { FC, useCallback, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { AppButton } from "ui/components/molecules/app_button/AppButton";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { MyFriendsContext } from "ui/screens/home/friends/MyFriendsProvider";
import useSendFriendOrRoommateRequest from "ui/screens/home/friends/useSendFriendOrRoommateRequest";
import useUpdateRelation from "ui/screens/home/friends/useUpdateRelation";

type Props = {
  title?: string;
  message?: string;
  shouldShow: boolean;
  getSelectedItem: () => RelationModel | undefined;
  hideSelf: () => void;
  type?: UpdateRelationStatus;
  firstButtonText?: string;
  secondButtonText?: string;
};

const RoommateRequestAlert: FC<Props> = React.memo(
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

    const { myFriends, setMyFriends } = useContext(MyFriendsContext);

    const changeStatus = useCallback(
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

    const onMatchRemoved = useCallback(
      (id: number) => {
        setMyFriends?.(myFriends?.filter((value) => value.id !== id));
      },
      [myFriends, setMyFriends]
    );

    const { shouldShowPb, sendRequest } = useSendFriendOrRoommateRequest(
      "Unable to send friend request",
      hideSelf,
      () => {
        changeStatus(getSelectedItem(), Status.PENDING);
      }
    );

    //for cancel, dismissed and block match
    const {
      shouldShowRelationUpdatePb,
      updateRelation
    } = useUpdateRelation(
      type ?? "accepted",
      "Unable to cancel request",
      hideSelf,
      () => {
        if (type === "cancel") {
          changeStatus(getSelectedItem(), undefined);
        } else {
          onMatchRemoved(getSelectedItem()?.id ?? -1);
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
                type === "cancel" || type === "blocked"
                  ? shouldShowRelationUpdatePb
                  : shouldShowPb
              }
              onPress={() => {
                if (type !== null && type !== undefined) {
                  updateRelation(getSelectedItem());
                } else {
                  sendRequest(getSelectedItem());
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
            {secondButtonText !== null && (
              <>
                <View
                  style={[
                    styles.separator,
                    { backgroundColor: theme.themedColors.separator }
                  ]}
                />
                <AppButton
                  text={secondButtonText}
                  style={styles.actionContainer}
                  shouldShowProgressBar={shouldShowRelationUpdatePb}
                  onPress={() => {
                    updateRelation(getSelectedItem());
                  }}
                  textStyle={[
                    styles.actionStyle,
                    {
                      color: theme.themedColors.danger,
                      textAlign: "center",
                      fontSize: FONT_SIZE.base
                    }
                  ]}
                  fontWeight="semi-bold"
                />
              </>
            )}
            <View
              style={[
                styles.separator,
                { backgroundColor: theme.themedColors.separator }
              ]}
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
export default RoommateRequestAlert;
