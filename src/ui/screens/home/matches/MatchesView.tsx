import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import RelationModel from "models/RelationModel";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { AppLog, capitalizeWords } from "utils/Util";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { usePreferredTheme } from "hooks";
import OptimizedBottomBreadCrumbs, {
  OptimizedBBCItem
} from "ui/components/templates/bottom_bread_crumbs/OptimizedBottomBreadCrumbs";
import MatchesTypeFilter, {
  getMatchesTypeFilterData
} from "models/enums/MatchesTypeFilter";
import EGender from "models/enums/EGender";

type Props = {
  isLoading: boolean;
  error: string | undefined;
  matches?: RelationModel[];
  onTypeChange: (value: MatchesTypeFilter) => void;
  onFilterChange: (keyword?: string, gender?: EGender) => void;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  postFriendRequest: (userId: number) => void;
  postMatchDismiss: (userId: number) => void;
  selectedTotalCount: number;
  moveToChatScreen: (profileMatch: RelationModel) => void;
  moveToProfileScreen: (profileMatch: RelationModel) => void;
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
  postFriendRequest,
  postMatchDismiss,
  selectedTotalCount,
  moveToChatScreen,
  moveToProfileScreen
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

  const profileMatch = useRef<RelationModel>();

  const renderItem = ({ item }: { item: RelationModel }) => (
    <ProfileMatchItem
      profileMatch={item}
      onFriendRequestClicked={() => {
        profileMatch.current = item;
        setRequestDialogVisible(true);
      }}
      onCrossClicked={() => {
        AppLog.log("onCrossClicked()");
        profileMatch.current = item;
        setDismissDialogVisible(true);
      }}
      onChatButtonClicked={moveToChatScreen}
      onImageClicked={moveToProfileScreen}
    />
  );

  function filter(): OptimizedBBCItem<MatchesTypeFilter>[] {
    return getMatchesTypeFilterData().map((value) => {
      const item: OptimizedBBCItem<MatchesTypeFilter> = {
        title: capitalizeWords(
          `${value.type.replace("_", " ")} ` +
            (filterType === value.type
              ? "(" + selectedTotalCount + ")"
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
      message={`Are you sure you want to send friend request to ${profileMatch.current?.userName}?`}
      actions={[
        {
          title: STRINGS.dialogs.friend_request.success,
          onPress: () => {
            setRequestDialogVisible(false);
            postFriendRequest(profileMatch.current!.userId);
            profileMatch.current = undefined;
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

  const dismissDialog = () => (
    <AppPopUp
      isVisible={isDismissDialogVisible}
      title={STRINGS.dialogs.dismiss_block.title}
      titleStyle={{ style: styles.dialogTitleStyle, weight: "semi-bold" }}
      messageStyle={{ style: styles.dialogMessageStyle }}
      message={`Do you want to add ${profileMatch.current?.userName} in your dismissed list or blocked list?`}
      actions={[
        {
          title: STRINGS.dialogs.dismiss_block.dismiss,
          onPress: () => {
            setDismissDialogVisible(false);
            postMatchDismiss(profileMatch.current!.userId);
            profileMatch.current = undefined;
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
            postMatchDismiss(profileMatch.current!.userId);
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
        keyExtractor={(item) => item.userId.toString()}
        error={error}
        retryCallback={pullToRefreshCallback}
      />
      {requestDialog()}
      {dismissDialog()}
      <OptimizedBottomBreadCrumbs<MatchesTypeFilter>
        data={filter()}
        onPress={(value) => {
          setFilterType(value);
          onTypeChange(value);
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
