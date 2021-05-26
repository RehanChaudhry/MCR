import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { MatchDismissBlockCancelApiRequestModel } from "models/api_requests/MatchDismissBlockCancelApiRequestModel";
import EGender from "models/enums/EGender";
import EIntBoolean from "models/enums/EIntBoolean";
import MatchesTypeFilter, {
  getMatchesTypeFilterData
} from "models/enums/MatchesTypeFilter";
import RelationActionType from "models/enums/RelationActionType";
import RelationFilterType from "models/enums/RelationFilterType";
import RelationModel from "models/RelationModel";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import OptimizedBottomBreadCrumbs, {
  OptimizedBBCItem
} from "ui/components/templates/bottom_bread_crumbs/OptimizedBottomBreadCrumbs";
import { AppLog, capitalizeWords } from "utils/Util";

type Props = {
  isLoading: boolean;
  error: string | undefined;
  matches?: RelationModel[];
  onTypeChange: (value?: MatchesTypeFilter) => void;
  onFilterChange: (keyword?: string, gender?: EGender) => void;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  isFriendRequestApiLoading: boolean;
  postFriendRequest: (userId: number, action: RelationActionType) => void;
  postMatchDismiss: (
    requestModel: MatchDismissBlockCancelApiRequestModel
  ) => void;
  selectedTotalCount: number;
  moveToChatScreen: (profileMatch: RelationModel) => void;
  moveToProfileScreen: (profileMatch: RelationModel) => void;
  postMatchBlocked: (
    requestModel: MatchDismissBlockCancelApiRequestModel,
    action: RelationActionType
  ) => void;
};

export const MatchesView: React.FC<Props> = ({
  isLoading,
  error,
  matches,
  onTypeChange,
  onFilterChange,
  pullToRefreshCallback,
  onEndReached,
  isAllDataLoaded,
  isFriendRequestApiLoading,
  postFriendRequest,
  postMatchDismiss,
  selectedTotalCount,
  moveToChatScreen,
  moveToProfileScreen,
  postMatchBlocked
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const [filterType, setFilterType] = useState<MatchesTypeFilter>(
    MatchesTypeFilter.MATCHES
  );

  const [
    isRequestDialogVisible,
    setRequestDialogVisible
  ] = useState<boolean>(false);

  const [
    isDismissDialogVisible,
    setDismissDialogVisible
  ] = useState<boolean>(false);

  const [
    isRoommateDialogVisible,
    setRoommateDialogVisible
  ] = useState<boolean>(false);

  const [
    isCancelRequestDialogVisible,
    setCancelRequestDialogVisible
  ] = useState<boolean>(false);

  const profileMatch = useRef<RelationModel>();

  const renderItem = useCallback(
    ({ item }: { item: RelationModel }) => {
      const _item = new RelationModel(item);
      return (
        <ProfileMatchItem
          profileMatch={_item}
          isFriendRequestApiLoading={
            profileMatch.current?.userId === _item.userId
              ? isFriendRequestApiLoading
              : false
          }
          onFriendRequestClicked={() => {
            profileMatch.current = _item;
            setRequestDialogVisible(true);
          }}
          onCrossClicked={() => {
            AppLog.log("onCrossClicked()");
            profileMatch.current = _item;
            setDismissDialogVisible(true);
          }}
          onChatButtonClicked={moveToChatScreen}
          onImageClicked={moveToProfileScreen}
          onRoommateRequestClicked={() => {
            profileMatch.current = _item;
            setRoommateDialogVisible(true);
          }}
          onCancelRequestClicked={() => {
            profileMatch.current = _item;
            setCancelRequestDialogVisible(true);
          }}
        />
      );
    },
    [moveToProfileScreen, moveToChatScreen, isFriendRequestApiLoading]
  );

  function filter(): OptimizedBBCItem<MatchesTypeFilter>[] {
    return getMatchesTypeFilterData().map((value) => {
      const item: OptimizedBBCItem<MatchesTypeFilter> = {
        title: capitalizeWords(
          `${value.type.replace("_", " ")}` +
            (filterType === value.type && selectedTotalCount > 0
              ? " (" + selectedTotalCount + ")"
              : "")
        ),
        value: value.type as MatchesTypeFilter
      };
      return item;
    });
  }

  const requestDialog = () => (
    <AppPopUp
      isVisible={isRequestDialogVisible}
      title={STRINGS.dialogs.friend_request.title}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Are you sure you want to send friend request to ${profileMatch.current?.user?.getFullName()}?`}
      actions={[
        {
          title: STRINGS.dialogs.friend_request.success,
          onPress: () => {
            setRequestDialogVisible(false);
            postFriendRequest(
              profileMatch.current!.userId,
              RelationActionType.FRIEND_REQUEST
            );
          },
          style: {
            weight: "semi-bold",
            style: [
              { color: themedColors.primary },
              styles.dialogButtonStyle
            ]
          }
        },
        {
          title: STRINGS.dialogs.cancel,
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {
            setRequestDialogVisible(false);
          }
        }
      ]}
    />
  );

  const roommateRequestDialog = () => (
    <AppPopUp
      isVisible={isRoommateDialogVisible}
      title={STRINGS.dialogs.roommate_request.title}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Are you sure you want to send roommate request to ${profileMatch.current?.user?.getFullName()}?`}
      actions={[
        {
          title: STRINGS.dialogs.roommate_request.success,
          onPress: () => {
            setRoommateDialogVisible(false);
            postFriendRequest(
              profileMatch.current!.userId,
              RelationActionType.ROOMMATE_REQUEST
            );
          },
          style: {
            weight: "semi-bold",
            style: [
              { color: themedColors.primary },
              styles.dialogButtonStyle
            ]
          }
        },
        {
          title: STRINGS.dialogs.cancel,
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {
            setRoommateDialogVisible(false);
          }
        }
      ]}
    />
  );

  const dismissDialog = () => (
    <AppPopUp
      isVisible={isDismissDialogVisible}
      title={STRINGS.dialogs.dismiss_block.title}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Do you want to add ${profileMatch.current?.user?.getFullName()} in your dismissed list or blocked list?`}
      actions={[
        {
          title: STRINGS.dialogs.dismiss_block.dismiss,
          onPress: () => {
            setDismissDialogVisible(false);
            postMatchDismiss({
              userId: profileMatch.current!.userId,
              status: RelationFilterType.DISMISSED
            });
          },
          style: {
            weight: "semi-bold",
            style: [{ color: themedColors.warn }, styles.dialogButtonStyle]
          }
        },
        {
          title: STRINGS.dialogs.dismiss_block.block,
          onPress: () => {
            setDismissDialogVisible(false);
            postMatchBlocked(
              {
                userId: profileMatch.current!.userId,
                status: RelationFilterType.BLOCKED
              },
              RelationActionType.BLOCKED
            );
            profileMatch.current = undefined;
          },
          style: {
            weight: "semi-bold",
            style: [
              { color: themedColors.danger },
              styles.dialogButtonStyle
            ]
          }
        },
        {
          title: STRINGS.dialogs.cancel,
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {
            setDismissDialogVisible(false);
          }
        }
      ]}
    />
  );

  const getTypeOfCancelRequest = () => {
    AppLog.log("profile match: " + JSON.stringify(profileMatch));
    if (
      profileMatch?.current?.isFriend === EIntBoolean.FALSE &&
      profileMatch.current.isRoommate === EIntBoolean.FALSE
    ) {
      return RelationActionType.CANCEL_FRIEND_REQUEST;
    } else {
      return RelationActionType.CANCEL_ROOMMATE_REQUEST;
    }
  };

  const cancelRequestDialog = () => (
    <AppPopUp
      isVisible={isCancelRequestDialogVisible}
      title={STRINGS.dialogs.cancel_request.title}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Are you sure you want to cancel request to ${profileMatch.current?.user?.getFullName()}?`}
      actions={[
        {
          title: STRINGS.dialogs.cancel_request.success,
          onPress: () => {
            setCancelRequestDialogVisible(false);
            postMatchBlocked(
              {
                userId: profileMatch.current!.userId,
                status: RelationFilterType.CANCEL
              },
              getTypeOfCancelRequest()
            );
          },
          style: {
            weight: "semi-bold",
            style: [
              { color: themedColors.primary },
              styles.dialogButtonStyle
            ]
          }
        },
        {
          title: STRINGS.dialogs.cancel,
          style: {
            style: styles.dialogButtonStyle
          },
          onPress: () => {
            setCancelRequestDialogVisible(false);
          }
        }
      ]}
    />
  );

  return (
    <Screen style={styles.container}>
      <MatchesFilter onFilterChange={onFilterChange} />
      <FlatListWithPb<RelationModel>
        style={styles.matchesList}
        shouldShowProgressBar={isLoading}
        data={matches}
        renderItem={renderItem}
        contentContainerStyle={styles.matchesListContainer}
        ItemSeparatorComponent={() => (
          <View style={styles.itemSeparator} />
        )}
        onEndReached={onEndReached}
        pullToRefreshCallback={pullToRefreshCallback}
        isAllDataLoaded={isAllDataLoaded}
        keyExtractor={(item) => item.id?.toString()}
        error={error}
        retryCallback={pullToRefreshCallback}
        extraData={isFriendRequestApiLoading}
      />
      {requestDialog()}
      {dismissDialog()}
      {roommateRequestDialog()}
      {cancelRequestDialog()}
      <OptimizedBottomBreadCrumbs<MatchesTypeFilter>
        data={filter()}
        onPress={(value) => {
          if (filterType !== value!) {
            setFilterType(value!);
            onTypeChange(value);
          }
        }}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  matchesListContainer: { padding: SPACE.lg },
  matchesList: { flex: 1 },
  itemSeparator: {
    height: SPACE.lg
  },
  dialogButtonStyle: {
    textAlign: "center",
    fontSize: FONT_SIZE.base
  },
  dialogTitleStyle: { fontSize: FONT_SIZE.base, textAlign: "center" },
  dialogMessageStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" }
});
