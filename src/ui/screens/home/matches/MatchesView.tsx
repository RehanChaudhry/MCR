import { FONT_SIZE, SPACE, STRINGS } from "config";
import { UpdateRelationApiRequestModel } from "models/api_requests/UpdateRelationApiRequestModel";
import EGender from "models/enums/EGender";
import MatchesTypeFilter, {
  getMatchesTypeFilterData
} from "models/enums/MatchesTypeFilter";
import RelationActionType from "models/enums/RelationActionType";
import RelationModel from "models/RelationModel";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import OptimizedBottomBreadCrumbs, {
  OptimizedBBCItem
} from "ui/components/templates/bottom_bread_crumbs/OptimizedBottomBreadCrumbs";
import ThreeButtonsAlert from "ui/screens/home/friends/MyFriends/ThreeButtonsAlert";
import { AppLog, capitalizeWords } from "utils/Util";
import TwoButtonsAlert, {
  Type
} from "../friends/MyFriends/TwoButtonsAlert";

type Props = {
  isLoading: boolean;
  error: string | undefined;
  matches?: RelationModel[];
  onTypeChange: (value?: MatchesTypeFilter) => void;
  onFilterChange: (keyword?: string, gender?: EGender) => void;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  isRequestApiLoading: boolean;
  postRequest: (userId: number, action: RelationActionType) => void;
  postMatchDismiss: (requestModel: UpdateRelationApiRequestModel) => void;
  selectedTotalCount: number;
  moveToChatScreen: (profileMatch: RelationModel) => void;
  moveToProfileScreen: (profileMatch: RelationModel) => void;
  postMatchBlocked: (
    requestModel: UpdateRelationApiRequestModel,
    action: RelationActionType
  ) => void;
  moveToRoommateRequests: (userId: number) => void;
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
  isRequestApiLoading,
  selectedTotalCount,
  moveToChatScreen,
  moveToProfileScreen,
  moveToRoommateRequests
}: Props) => {
  const [filterType, setFilterType] = useState<MatchesTypeFilter>(
    MatchesTypeFilter.MATCHES
  );

  const [
    isFriendRequestDialogVisible,
    setFriendRequestDialogVisible
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

  const hideRommateRequestAlert = useCallback(() => {
    setRoommateDialogVisible(false);
  }, []);

  const hideFriendRequestAlert = useCallback(() => {
    setFriendRequestDialogVisible(false);
  }, []);

  const hideCancelRequestAlert = useCallback(() => {
    setCancelRequestDialogVisible(false);
  }, []);

  const hideDismissBlockAlert = useCallback(() => {
    setDismissDialogVisible(false);
  }, []);

  const profileMatch = useRef<RelationModel>();

  const renderItem = useCallback(
    ({ item }: { item: RelationModel }) => {
      const _item = new RelationModel(item);
      return (
        <ProfileMatchItem
          profileMatch={_item}
          isFriendRequestApiLoading={
            profileMatch.current?.userId === _item.userId
              ? isRequestApiLoading
              : false
          }
          onFriendRequestClicked={() => {
            profileMatch.current = _item;
            setFriendRequestDialogVisible(true);
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
          onRequestReceivedClicked={moveToRoommateRequests}
        />
      );
    },
    [
      moveToProfileScreen,
      moveToChatScreen,
      isRequestApiLoading,
      moveToRoommateRequests
    ]
  );

  const getSelectedItem = useCallback(() => {
    return profileMatch.current;
  }, []);

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
        extraData={isRequestApiLoading}
      />
      <TwoButtonsAlert
        shouldShow={isRoommateDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRommateRequestAlert}
        title="Roommate Request"
        message={`Are you sure you want to send roommate request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        type={Type.MATCHES_ROOMMATE_REQUEST}
      />
      <TwoButtonsAlert
        shouldShow={isFriendRequestDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideFriendRequestAlert}
        title="Friend Request"
        message={`Are you sure you want to send friend request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        type={Type.FRIEND_REQUEST}
      />
      <TwoButtonsAlert
        shouldShow={isCancelRequestDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideCancelRequestAlert}
        title={STRINGS.dialogs.cancel_request.title}
        message={`Are you sure you want to cancel request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        firstButtonText={STRINGS.dialogs.cancel_request.success}
        type={Type.CANCEL}
      />
      <ThreeButtonsAlert
        shouldShow={isDismissDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideDismissBlockAlert}
        title={STRINGS.dialogs.dismiss_block.title}
        message={`Do you want to add ${getSelectedItem()?.user?.getFullName()} in your dismissed list or blocked list?`}
      />
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
