import UserGroupIcon from "assets/images/icon_user_group.svg";
import { SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionListHeader from "ui/components/organisms/friends/connection/ConnectionListHeader";
import TwoButtonsAlert, {
  Type
} from "ui/screens/home/friends/MyFriends/TwoButtonsAlert";
import InfoAlert from "./InfoAlert";
import RelationListsItem from "ui/components/organisms/relation_item/RelationItem";

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
  moveToProfileScreen: (relationModel: RelationModel) => void;
  moveToRoommateRequests: (relationModel: RelationModel) => void;
};

const listItem = (
  item: RelationModel,
  onPressChat: (item: RelationModel) => void,
  showRequestAlert: (item: RelationModel) => void,
  showIneligibleInfoAlert: (item: RelationModel) => void,
  showCancelAlert: (item: RelationModel) => void,
  onPressCross: (item: RelationModel) => void,
  moveToProfileScreen: (relationModel: RelationModel) => void,
  moveToRoommateRequests: (relationModel: RelationModel) => void
) => {
  const _item = new RelationModel(item);
  /*const actionButtonTitle: () => string = () => {
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
      subtitle={`${_item.user?.hometown ?? STRINGS.common.not_found}, ${
        _item.user?.major ?? STRINGS.common.not_found
      }`}
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
  );*/
  return (
    <RelationListsItem
      relationModel={_item}
      onCrossClicked={onPressCross}
      onChatButtonClicked={onPressChat}
      onUserClicked={moveToProfileScreen}
      onRoommateRequestActionButtonClicked={showRequestAlert}
      onCancelRequestActionButtonClicked={showCancelAlert}
      onRoommateRequestReceivedActionButtonClicked={moveToRoommateRequests}
      onNotEligibleActionButtonClicked={showIneligibleInfoAlert}
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
  onPressReceivedFriendRequests,
  moveToProfileScreen,
  moveToRoommateRequests
}) => {
  const theme = usePreferredTheme();

  const selectedItem = useRef<RelationModel>();

  const [showRequestAlert, setShowRequestAlert] = useState<boolean>(false);
  const [showInfoAlert, setShowInfoAlert] = useState<boolean>(false);
  const [
    isCancelAlertVisible,
    setCancelAlertVisibility
  ] = useState<boolean>(false);

  const [
    showRemoveFriendAlert,
    setShowRemoveFriendAlert
  ] = useState<boolean>(false);

  const showRoommateRequestAlert = (item: RelationModel) => {
    selectedItem.current = item;
    setShowRequestAlert(true);
  };

  const showIneligibleInfoAlert = (item: RelationModel) => {
    selectedItem.current = item;
    setShowInfoAlert(true);
  };

  const showCancelAlert = (item: RelationModel) => {
    selectedItem.current = item;
    setCancelAlertVisibility(true);
  };

  const onPressCross = (item: RelationModel) => {
    selectedItem.current = item;
    setShowRemoveFriendAlert(true);
  };

  const headerDetails = () => {
    const friendLabel: string = "friends";
    let details = `You have currently ${friendsCount} ` + friendLabel;

    if (pendingFriendsCount > 0) {
      details +=
        ` and received ${pendingFriendsCount} friend ` + "requests";
    }

    return details;
  };

  const hideRemoveFriendAlert = useCallback(() => {
    setShowRemoveFriendAlert(false);
  }, []);
  const hideRommateRequestAlert = useCallback(() => {
    setShowRequestAlert(false);
  }, []);
  const hideInfoAlert = useCallback(() => {
    setShowInfoAlert(false);
  }, []);
  const hideCancelRequestAlert = useCallback(() => {
    setCancelAlertVisibility(false);
  }, []);
  const getSelectedItem = useCallback(() => {
    return selectedItem.current;
  }, []);

  return (
    <>
      <Screen shouldAddBottomInset={false}>
        <FlatListWithPb
          keyExtractor={(item) => item.userId.toString()}
          style={styles.list}
          shouldShowProgressBar={isLoading}
          isAllDataLoaded={!canLoadMore}
          onEndReached={onEndReached}
          pullToRefreshCallback={onPullToRefresh}
          error={error}
          noRecordFoundText={"You do not have any friends."}
          ListHeaderComponent={() => (
            <ConnectionListHeader
              containerStyle={styles.header}
              title={
                `Received ${pendingFriendsCount} new friend ` + "requests"
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
              showRoommateRequestAlert,
              showIneligibleInfoAlert,
              showCancelAlert,
              onPressCross,
              moveToProfileScreen,
              moveToRoommateRequests
            );
          }}
          data={data}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
        />
      </Screen>
      <TwoButtonsAlert
        shouldShow={showRemoveFriendAlert}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRemoveFriendAlert}
        title="Remove Friend"
        message={`Are you sure you want to remove ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } from your friends list?`}
        type={Type.UNFRIEND}
        errorMessage="Unable to remove friend"
        firstButtonText="Yes, remove"
        isFromMatchScreen={false}
      />
      <TwoButtonsAlert
        shouldShow={showRequestAlert}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRommateRequestAlert}
        title="Roommate Request"
        message={`Are you sure you want to send roommate request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        type={Type.ROOMMATE_REQUEST}
        errorMessage="Unable to send roommate request"
        firstButtonText="Yes, send request"
        isFromMatchScreen={false}
      />
      <InfoAlert
        shouldShow={showInfoAlert}
        title={"Not eligible for roommate"}
        message={`You can't send roommate request to <b>${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }</b> because he has the maximum allowable number of roommates, and does not allow you to send a roommate request.`}
        hideSelf={hideInfoAlert}
      />
      <TwoButtonsAlert
        shouldShow={isCancelAlertVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideCancelRequestAlert}
        title={
          STRINGS.dialogs.cancel_request.title_cancel_roommate_request
        }
        message={`Are you sure you want to cancel roommates request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        firstButtonText={STRINGS.dialogs.cancel_request.success}
        type={Type.CANCEL}
        errorMessage="Unable to send cancel request"
        isFromMatchScreen={false}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: "100%",
    height: "100%"
  },
  listContainer: { padding: SPACE.lg },
  itemSeparator: {
    height: SPACE.lg
  },
  header: {
    paddingBottom: SPACE.sm
  }
});

export default MyFriendsView;
