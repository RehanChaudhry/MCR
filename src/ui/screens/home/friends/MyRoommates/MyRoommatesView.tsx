import HomeOfficeIcon from "assets/images/icon_office_building.svg";
import { usePreferredTheme } from "hooks";
import React, { FC, useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import ConnectionListHeader from "ui/components/organisms/friends/connection/ConnectionListHeader";
import { SPACE } from "config";
import TwoButtonsAlert, { Type } from "../MyFriends/TwoButtonsAlert";
import RelationModel from "models/RelationModel";
import RelationListsItem from "ui/components/organisms/relation_item/RelationItem";

type Props = {
  roomatesCount: number;
  pendingRoommatesCount: number;
  data?: RelationModel[];
  isLoading: boolean;
  canLoadMore: boolean;
  error?: string;
  onPullToRefresh: (onComplete?: () => void) => void;
  onEndReached: () => void;
  onPressChat: (item: RelationModel) => void;
  onPressReceivedRoommateRequests: () => void;
  onPressProfile: (relationModel: RelationModel) => void;
  isLoggedInUserAModerator: boolean;
};

const listItem = (
  item: RelationModel,
  showRemoveRommmateAlert: (item: RelationModel) => void,
  onPressChat: (item: RelationModel) => void,
  onPressProfile: (item: RelationModel) => void,
  isLoggedInUserAModerator: boolean
) => {
  const _item = new RelationModel(item);
  return (
    <RelationListsItem
      isLoggedInUserAModerator={isLoggedInUserAModerator}
      relationModel={_item}
      onChatButtonClicked={onPressChat}
      onUserClicked={onPressProfile}
      onRemoveRoommateActionButtonClicked={showRemoveRommmateAlert}
    />
  );
};

const MyRoommatesView: FC<Props> = ({
  data,
  isLoggedInUserAModerator,
  pendingRoommatesCount,
  roomatesCount,
  isLoading,
  canLoadMore,
  onEndReached,
  onPullToRefresh,
  error,
  onPressChat,
  onPressProfile,
  onPressReceivedRoommateRequests
}) => {
  const theme = usePreferredTheme();

  const selectedItem = useRef<RelationModel>();

  const [
    shouldShowRemoveRoommateAlert,
    setShouldShowRemoveRoommateAlert
  ] = useState<boolean>(false);

  const getSelectedItem = useCallback(() => {
    return selectedItem.current;
  }, []);

  const hideRemoveRoomateAlert = useCallback(() => {
    setShouldShowRemoveRoommateAlert(false);
  }, []);

  const showRemoveRoommateAlert = useCallback((item: RelationModel) => {
    selectedItem.current = item;
    setShouldShowRemoveRoommateAlert(true);
  }, []);

  const headerDetails = () => {
    const label: string = roomatesCount > 1 ? "roommates" : "roommate";
    let details = `You have currently ${roomatesCount} ` + label;

    if (pendingRoommatesCount > 0) {
      details +=
        ` and received ${pendingRoommatesCount} roommate ` +
        (pendingRoommatesCount > 1 ? "requests." : "request.");
    }

    return details;
  };
  return (
    <>
      <Screen shouldAddBottomInset={false}>
        <FlatListWithPb
          style={styles.list}
          shouldShowProgressBar={isLoading}
          isAllDataLoaded={!canLoadMore}
          onEndReached={onEndReached}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          pullToRefreshCallback={onPullToRefresh}
          error={error}
          ListHeaderComponent={() => (
            <ConnectionListHeader
              containerStyle={styles.header}
              title={
                `Received ${pendingRoommatesCount} new roommate ` +
                (pendingRoommatesCount > 1 ? "requests" : "request")
              }
              detail={headerDetails()}
              icon={() => (
                <HomeOfficeIcon
                  fill={theme.themedColors.labelSecondary}
                  width={18}
                  height={18}
                />
              )}
              onPressAction={onPressReceivedRoommateRequests}
            />
          )}
          renderItem={({ item }) => {
            return listItem(
              item,
              showRemoveRoommateAlert,
              onPressChat,
              onPressProfile,
              isLoggedInUserAModerator
            );
          }}
          data={data}
        />
      </Screen>
      <TwoButtonsAlert
        shouldShow={shouldShowRemoveRoommateAlert}
        getSelectedItem={getSelectedItem}
        hideSelf={hideRemoveRoomateAlert}
        title="Remove Roommate"
        message={`Are you sure you want to remove ${
          getSelectedItem()?.user?.getFullName() ?? "N/A"
        } from your roommates list?`}
        type={Type.UNFRIEND}
        errorMessage="Unable to remove roommate"
        firstButtonText="Yes, remove"
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

export default MyRoommatesView;
