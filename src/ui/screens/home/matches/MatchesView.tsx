import { FONT_SIZE, SPACE, STRINGS } from "config";
import Strings from "config/Strings";
import MatchesTypeFilter, {
  getMatchesTypeFilterData
} from "models/enums/MatchesTypeFilter";
import RelationModel from "models/RelationModel";
import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import RelationListsItem from "ui/components/organisms/relation_item/RelationItem";
import OptimizedBottomBreadCrumbs, {
  OptimizedBBCItem
} from "ui/components/templates/bottom_bread_crumbs/OptimizedBottomBreadCrumbs";
import ThreeButtonsAlert from "ui/screens/home/friends/MyFriends/ThreeButtonsAlert";
import TwoButtonsAlert, {
  Type
} from "ui/screens/home/friends/MyFriends/TwoButtonsAlert";
import { capitalizeWords } from "utils/Util";
import { AppLabel } from "../../../components/atoms/app_label/AppLabel";
import { MatchesGenderResponseModel } from "models/api_responses/MatchesGenderResponseModel";

type Props = {
  isLoading: boolean;
  error: string | undefined;
  matches?: RelationModel[];
  onFilterByChange: (value?: MatchesTypeFilter) => void;
  onKeywordAndGenderChange: (keyword?: string, gender?: string) => void;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  isLoggedInUserAModerator: boolean;
  isAllDataLoaded: boolean;
  selectedTotalCount: number;
  moveToChatScreen: (profileMatch: RelationModel) => void;
  moveToProfileScreen: (profileMatch: RelationModel) => void;
  moveToRoommateRequests: (profileMatch: RelationModel) => void;
  moveToFriendRequests: (profileMatch: RelationModel) => void;
  matchesGenderFilter: MatchesGenderResponseModel;
};

export const MatchesView: React.FC<Props> = ({
  isLoading,
  error,
  matches,
  onFilterByChange,
  onKeywordAndGenderChange,
  pullToRefreshCallback,
  onEndReached,
  isLoggedInUserAModerator,
  isAllDataLoaded,
  selectedTotalCount,
  moveToChatScreen,
  moveToProfileScreen,
  moveToRoommateRequests,
  moveToFriendRequests,
  matchesGenderFilter
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
        <RelationListsItem
          relationModel={_item}
          isLoggedInUserAModerator={isLoggedInUserAModerator}
          onCrossClicked={() => {
            profileMatch.current = _item;
            setDismissDialogVisible(true);
          }}
          onChatButtonClicked={moveToChatScreen}
          onUserClicked={moveToProfileScreen}
          onRoommateRequestActionButtonClicked={() => {
            profileMatch.current = _item;
            setRoommateDialogVisible(true);
          }}
          onCancelRequestActionButtonClicked={() => {
            profileMatch.current = _item;
            setCancelRequestDialogVisible(true);
          }}
          onFriendRequestReceivedActionButtonClicked={moveToFriendRequests}
          onRoommateRequestReceivedActionButtonClicked={
            moveToRoommateRequests
          }
          onFriendRequestActionButtonClicked={() => {
            profileMatch.current = _item;
            setFriendRequestDialogVisible(true);
          }}
        />
      );
    },
    [
      isLoggedInUserAModerator,
      moveToProfileScreen,
      moveToChatScreen,
      moveToFriendRequests,
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
          `${value.type.replace("-", " ")}` +
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
      <MatchesFilter
        onFilterChange={onKeywordAndGenderChange}
        matchesGenderFilter={matchesGenderFilter}
      />

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
        keyExtractor={(item) => item.userId?.toString()}
        error={error}
        noRecordFoundText={
          "You do not have any students matches available for now."
        }
        ListHeaderComponent={() => (
          <AppLabel
            text={Strings.matches.label_tool_tip}
            numberOfLines={0}
            shouldNotOptimize={true}
            style={styles.toolTipText}
          />
        )}
        retryCallback={pullToRefreshCallback}
      />
      <TwoButtonsAlert
        shouldShow={isRoommateDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRommateRequestAlert}
        title="Roommate Request"
        message={`Are you sure you want to send roommate request to ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        }?`}
        type={Type.ROOMMATE_REQUEST}
        errorMessage="Unable to send roommate request"
        firstButtonText="Yes, send request"
        isFromMatchScreen={true}
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
        errorMessage="Unable to send friend request"
        firstButtonText="Yes, send request"
        isFromMatchScreen={true}
      />
      <TwoButtonsAlert
        shouldShow={isCancelRequestDialogVisible}
        getSelectedItem={getSelectedItem}
        hideSelf={hideCancelRequestAlert}
        title={
          profileMatch?.current?.isFriend === 0
            ? Strings.dialogs.cancel_request.title_cancel_friend_request
            : Strings.dialogs.cancel_request.title_cancel_roommate_request
        }
        message={`Are you sure you want to cancel ${
          profileMatch?.current?.isFriend === 0 ? "friend" : "roommate"
        } request to ${getSelectedItem()?.user?.getFullName() ?? "N/A"}?`}
        firstButtonText={STRINGS.dialogs.cancel_request.success}
        type={Type.CANCEL}
        errorMessage="Unable to send cancel request"
        isFromMatchScreen={true}
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
            onFilterByChange(value);
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
  dialogMessageStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" },
  toolTipText: {
    marginBottom: SPACE.md
  }
});
