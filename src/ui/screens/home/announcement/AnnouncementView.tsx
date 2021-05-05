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
  likeDislikeAPi: (postId: number) => Promise<boolean>;
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
    likeDislikeAPi,
    error
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
          likeDislikeAPi={likeDislikeAPi}
        />
      ),
      [likeDislikeAPi, openCommentsScreen, shouldPlayVideo]
    );
    return (
      <Screen style={styles.container}>
        {useLazyLoadInterface(
          <FlatListWithPb
            removeClippedSubviews={true}
            shouldShowProgressBar={shouldShowProgressBar}
            data={data}
            style={styles.list}
            contentContainerStyle={styles.listContainer}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparator} />
            )}
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
