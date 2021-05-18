import { SPACE } from "config";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { AnnouncementItem } from "ui/components/molecules/AnnouncementItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  error: string | undefined;
};

export const AnnouncementView = React.memo<Props>(
  ({
    data,
    shouldShowProgressBar,
    onEndReached,
    isAllDataLoaded,
    pullToRefreshCallback,
    openCommentsScreen,
    shouldPlayVideo,
    error
  }) => {
    const keyExtractor = useCallback(
      (item: CommunityAnnouncement) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: CommunityAnnouncement }) => {
        return (
          <AnnouncementItem
            announcementItem={item}
            openCommentsScreen={openCommentsScreen}
            shouldPlayVideo={shouldPlayVideo}
          />
        );
      },
      [openCommentsScreen, shouldPlayVideo]
    );

    const itemSeperatorComponent = useCallback(
      () => <View style={styles.itemSeparator} />,
      []
    );

    return (
      <Screen style={styles.container}>
        {useLazyLoadInterface(
          <FlatListWithPb
            removeClippedSubviews={true}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={8}
            shouldShowProgressBar={shouldShowProgressBar}
            data={data}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={itemSeperatorComponent}
            error={error}
            renderItem={listItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            isAllDataLoaded={isAllDataLoaded}
            pullToRefreshCallback={pullToRefreshCallback}
            retryCallback={pullToRefreshCallback}
          />
        )}
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: { padding: SPACE.lg },
  list: {
    flex: 1
  },
  itemSeparator: {
    height: SPACE.lg
  }
});
