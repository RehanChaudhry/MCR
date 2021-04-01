import { SPACE } from "config";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { AnnouncementItem } from "ui/components/molecules/AnnouncementItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  openCommentsScreen?: () => void | undefined;
  shouldPlayVideo: boolean;
};

export const AnnouncementView = React.memo<Props>(
  ({
    data,
    shouldShowProgressBar,
    onEndReached,
    isAllDataLoaded,
    pullToRefreshCallback,
    openCommentsScreen,
    shouldPlayVideo
  }) => {
    const keyExtractor = useCallback(
      (item: CommunityAnnouncement) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: CommunityAnnouncement }) => (
        <AnnouncementItem
          announcementItem={item}
          openCommentsScreen={openCommentsScreen}
          shouldPlayVideo={shouldPlayVideo}
        />
      ),
      [openCommentsScreen, shouldPlayVideo]
    );
    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          shouldShowProgressBar={shouldShowProgressBar}
          data={data}
          style={styles.list}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          renderItem={listItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
          pullToRefreshCallback={pullToRefreshCallback}
        />
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: { padding: SPACE.md },
  list: {
    flex: 1
  },
  itemSeparator: {
    height: SPACE.md
  }
});
