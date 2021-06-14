import { SPACE } from "config";
import RelationModel from "models/RelationModel";
import React, { FC, useCallback, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import DismissedOrBlockedListHeader from "ui/components/organisms/friends/dismissed_or_blocked/DismissedOrBlockedListHeader";
import RelationListsItem from "ui/components/organisms/relation_item/RelationItem";
import TwoButtonsAlert, {
  Type
} from "ui/screens/home/friends/MyFriends/TwoButtonsAlert";

type Props = {
  data: RelationModel[] | undefined;
  headerTitle: string;
  headerSubtitle: string;
  learnMoreTitle: string;
  learnMoreAction: () => void;
  onPressChat: (item: RelationModel) => void;
  onPressProfile: () => void;
  isLoading: boolean;
  canLoadMore: boolean;
  error?: string;
  onPullToRefresh: (onComplete?: () => void) => void;
  onEndReached: () => void;
  selectedTab: number;
};

const listItem = (
  item: RelationModel,
  onPressChat: (item: RelationModel) => void,
  onPressProfile: () => void,
  showRestoreAlert: (item: RelationModel) => void,
  showUnblockAlert: (item: RelationModel) => void
) => {
  const _item = new RelationModel(item);
  return (
    <RelationListsItem
      relationModel={_item}
      onChatButtonClicked={onPressChat}
      onImageClicked={onPressProfile}
      onRestoreDismissedActionButtonClicked={showRestoreAlert}
      onUnBlockedActionButtonClicked={showUnblockAlert}
    />
  );
};

const DismissedOrBlockedView: FC<Props> = ({
  data,
  headerTitle,
  headerSubtitle,
  learnMoreTitle,
  learnMoreAction,
  isLoading,
  canLoadMore,
  onEndReached,
  onPullToRefresh,
  error,
  onPressChat,
  onPressProfile
}) => {
  const selectedItem = useRef<RelationModel>();

  const [
    shouldShowRestoreAlert,
    setShouldShowRestoreAlert
  ] = useState<boolean>(false);

  const [
    shouldShowUnblockAlert,
    setShouldShowUnblockAlert
  ] = useState<boolean>(false);

  const getSelectedItem = useCallback(() => {
    return selectedItem.current;
  }, []);

  const hideRestoreAlert = useCallback(() => {
    setShouldShowRestoreAlert(false);
  }, []);

  const showRestoreAlert = (item: RelationModel) => {
    selectedItem.current = item;
    setShouldShowRestoreAlert(true);
  };

  const hideUnblockAlert = useCallback(() => {
    setShouldShowUnblockAlert(false);
  }, []);

  const showUnblockAlert = (item: RelationModel) => {
    selectedItem.current = item;
    setShouldShowUnblockAlert(true);
  };

  return (
    <>
      <Screen shouldAddBottomInset={false}>
        <FlatListWithPb
          shouldShowProgressBar={isLoading}
          isAllDataLoaded={!canLoadMore}
          onEndReached={onEndReached}
          style={styles.list}
          pullToRefreshCallback={onPullToRefresh}
          error={error}
          contentContainerStyle={styles.listContainer}
          ListHeaderComponent={() => (
            <DismissedOrBlockedListHeader
              title={headerTitle}
              subtitle={headerSubtitle}
              learnMoreTitle={learnMoreTitle}
              learnMoreAction={learnMoreAction}
            />
          )}
          renderItem={({ item }) => {
            return listItem(
              item,
              onPressChat,
              onPressProfile,
              showRestoreAlert,
              showUnblockAlert
            );
          }}
          data={data}
        />
      </Screen>
      <TwoButtonsAlert
        shouldShow={shouldShowRestoreAlert}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRestoreAlert}
        title="Restore"
        message={`Are you sure you want to restore ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } from your dismissed list?`}
        type={Type.RESTORE}
        errorMessage="Unable to restore"
        firstButtonText="Yes, restore"
        isFromMatchScreen={false}
      />
      <TwoButtonsAlert
        shouldShow={shouldShowUnblockAlert}
        getSelectedItem={getSelectedItem}
        hideSelf={hideUnblockAlert}
        title="Unblock"
        message={`Are you sure you want to unblock ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } from your blocked list?`}
        type={Type.UNBLOCK}
        errorMessage="Unable to unblock"
        firstButtonText="Yes, unblock"
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
  listContainer: { padding: SPACE.lg }
});

export default DismissedOrBlockedView;
