import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import ProfileMatch from "models/ProfileMatch";
import ProfileMatchItem from "ui/components/organisms/profile_match_item/ProfileMatchItem";
import MatchesFilter from "ui/components/molecules/matches_filter/MatchesFilter";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { FilterCount } from "models/api_responses/MatchesFilterApiResponseModel";
import { AppLog, capitalizeWords } from "utils/Util";
import AppPopUp from "ui/components/organisms/popup/AppPopUp";
import { usePreferredTheme } from "hooks";

type Props = {
  matches?: ProfileMatch[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  postFriendRequest: (userId: number) => void;
  postMatchDismiss: (userId: number) => void;
  filterCounts: FilterCount[];
  moveToChatScreen: (profileMatch: ProfileMatch) => void;
  moveToProfileScreen: (profileMatch: ProfileMatch) => void;
};

export const MatchesView: React.FC<Props> = ({
  matches,
  pullToRefreshCallback,
  onEndReached,
  isAllDataLoaded,
  postFriendRequest,
  postMatchDismiss,
  filterCounts,
  moveToChatScreen,
  moveToProfileScreen
}: Props) => {
  const { themedColors } = usePreferredTheme();

  const [
    isRequestDialogVisible,
    setRequestDialogVisible
  ] = useState<boolean>(false);

  const [
    isDismissDialogVisible,
    setDismissDialogVisible
  ] = useState<boolean>(false);

  const profileMatch = useRef<ProfileMatch>();

  const renderItem = ({ item }: { item: ProfileMatch }) => (
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

  function getFilterCountData(): Item[] {
    return filterCounts.map((value) => {
      const item: Item = {
        title: capitalizeWords(
          `${value.type.replace("_", " ")} (${value.count})`
        ),
        onPress: () => {
          // call callback from controller
        }
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
      <MatchesFilter onFilterChange={(_, __) => {}} />
      <FlatListWithPb<ProfileMatch>
        style={styles.matchesList}
        shouldShowProgressBar={false}
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
      />
      {requestDialog()}
      {dismissDialog()}
      <BottomBreadCrumbs data={getFilterCountData()} />
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
    fontSize: FONT_SIZE.sm
  },
  dialogTitleStyle: { fontSize: FONT_SIZE.sm, textAlign: "center" },
  dialogMessageStyle: { fontSize: FONT_SIZE.xs, textAlign: "center" }
});
