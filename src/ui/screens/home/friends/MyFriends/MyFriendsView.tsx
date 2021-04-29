import UserGroupIcon from "assets/images/icon_user_group.svg";
import { FONT_SIZE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import RelationType from "models/enums/RelationType";
import RelationModel from "models/RelationModel";
import React, { FC, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionItem, {
  CONNECTION_ACTION_STATE
} from "ui/components/organisms/friends/connection/ConnectionItem";
import ConnectionListHeader from "ui/components/organisms/friends/connection/ConnectionListHeader";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";

type Props = {
  friendsCount: number;
  pendingFriendsCount: number;
  data?: RelationModel[];
  isLoading: boolean;
  canLoadMore: boolean;
  error?: string;
  onPullToRefresh: (onComplete?: () => void) => void;
  onEndReached: () => void;
  onPressChat: (item: RelationModel) => void;
  onPressReceivedFriendRequests: () => void;
};

const listItem = (
  item: RelationModel,
  onPressChat: (item: RelationModel) => void,
  onPressAction: (item: RelationModel) => void,
  onPressCross: (item: RelationModel) => void
) => {
  const _item = new RelationModel(item);
  const actionButtonTitle: () => string = () => {
    if (_item.getType() === RelationType.NOT_ELIGIBLE) {
      return "Not Eligible";
    } else if (_item.getType() === RelationType.FRIEND_REQUESTED) {
      return "Pending Request";
    } else {
      return "Roommate Request";
    }
  };

  const actionButtonState: () => CONNECTION_ACTION_STATE = () => {
    if (_item.getType() === RelationType.NOT_ELIGIBLE) {
      return CONNECTION_ACTION_STATE.DANGER;
    } else if (_item.getType() === RelationType.FRIEND_REQUESTED) {
      return CONNECTION_ACTION_STATE.READONLY;
    } else {
      return CONNECTION_ACTION_STATE.NORMAL;
    }
  };

  return (
    <ConnectionItem
      title={_item.user?.getFullName() ?? ""}
      subtitle={`${
        _item.user?.matchGroupName ?? STRINGS.common.not_found
      }, ${_item.user?.major ?? STRINGS.common.not_found}`}
      profileImage={_item.user?.profilePicture?.fileURL ?? ""}
      actionButtonTitle={actionButtonTitle()}
      actionButtonState={actionButtonState()}
      shouldShowTopActionable={true}
      shouldShowLeftInfoIcon={
        actionButtonState() === CONNECTION_ACTION_STATE.DANGER
      }
      onPressAction={() => {
        onPressAction(_item);
      }}
      onPressChat={() => {
        onPressChat(_item);
      }}
      onPressCross={() => {
        onPressCross(_item);
      }}
    />
  );
};

const MyFriendsView: FC<Props> = ({
  friendsCount,
  pendingFriendsCount,
  data,
  isLoading,
  canLoadMore,
  error,
  onPullToRefresh,
  onEndReached,
  onPressChat,
  onPressReceivedFriendRequests
}) => {
  const theme = usePreferredTheme();

  const selectedItem = useRef<RelationModel>();

  const [showRequestAlert, setShowRequestAlert] = useState<boolean>(false);
  const [
    showNotEligibleAlert,
    setShowNotEligibleAlert
  ] = useState<boolean>(false);

  const [
    showRemoveFriendAlert,
    setShowRemoveFriendAlert
  ] = useState<boolean>(false);

  const roomateRequestAlert = () => {
    return (
      <AppPopUp
        isVisible={showRequestAlert}
        title={"Roommate Request"}
        message={
          "Are you sure you want to send roommate request to Aris Johnson?"
        }
        actions={[
          {
            title: "Yes, send request",
            onPress: () => {
              setShowRequestAlert(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              setShowRequestAlert(false);
            }
          }
        ]}
      />
    );
  };

  const notEligibleAlert = () => {
    return (
      <AppPopUp
        isVisible={showNotEligibleAlert}
        title={"Not eligible for roommate"}
        message={
          "You can't send roommate request to Aris Johnson because he has the maximum allowable number of roommates, and does not allow you to send a roommate request."
        }
        actions={[
          {
            title: "OK",
            onPress: () => {
              setShowNotEligibleAlert(false);
            },
            style: {
              style: {
                color: theme.themedColors.primary,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          }
        ]}
      />
    );
  };

  const removeFriendAlert = () => {
    return (
      <AppPopUp
        isVisible={showRemoveFriendAlert}
        title={"Remove Friend"}
        message={`Are you sure you want to remove ${
          selectedItem.current?.user?.getFullName() ?? ""
        } from your friends list?`}
        actions={[
          {
            title: "Yes, remove",
            onPress: () => {
              setShowRemoveFriendAlert(false);
            },
            style: {
              weight: "bold",
              style: {
                color: theme.themedColors.danger,
                textAlign: "center",
                fontSize: FONT_SIZE.lg
              }
            }
          },
          {
            title: "Cancel",
            onPress: () => {
              setShowRemoveFriendAlert(false);
            }
          }
        ]}
      />
    );
  };

  const onPressAction = (item: RelationModel) => {
    selectedItem.current = item;
    const _item = new RelationModel(item);
    if (_item.getType() === RelationType.NOT_ELIGIBLE) {
      setShowNotEligibleAlert(true);
    } else {
      setShowRequestAlert(true);
    }
  };

  const onPressCross = (item: RelationModel) => {
    selectedItem.current = item;
    setShowRemoveFriendAlert(true);
  };

  const headerDetails: () => string = () => {
    const friendLabel: string = friendsCount > 1 ? "friends" : "friend";
    let details = `You have currently ${friendsCount} ` + friendLabel;

    if (pendingFriendsCount > 0) {
      details +=
        ` and received ${pendingFriendsCount} friend ` +
        (pendingFriendsCount > 1 ? "requests." : "request.");
    }

    return details;
  };

  return (
    <>
      <Screen shouldAddBottomInset={false}>
        <FlatListWithPb
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          shouldShowProgressBar={isLoading}
          isAllDataLoaded={!canLoadMore}
          onEndReached={onEndReached}
          pullToRefreshCallback={onPullToRefresh}
          error={error}
          ListHeaderComponent={() => (
            <ConnectionListHeader
              title={
                `Received ${pendingFriendsCount} new friend ` +
                (pendingFriendsCount > 1 ? "requests" : "request")
              }
              detail={headerDetails()}
              icon={() => (
                <UserGroupIcon
                  fill={theme.themedColors.labelSecondary}
                  width={18}
                  height={18}
                />
              )}
              onPressAction={onPressReceivedFriendRequests}
            />
          )}
          renderItem={({ item }) => {
            return listItem(
              item,
              onPressChat,
              onPressAction,
              onPressCross
            );
          }}
          data={data}
        />
      </Screen>
      {removeFriendAlert()}
      {roomateRequestAlert()}
      {notEligibleAlert()}
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%"
  }
});

export default MyFriendsView;
