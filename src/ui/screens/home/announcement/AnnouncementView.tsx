import { SPACE } from "config";
import { PostFeed } from "models/api_responses/FetchPostFeedListResponseModel";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { listContentContainerStyle, listItemSeparator } from "utils/Util";
import { FeedPostItem } from "ui/components/molecules/FeedPostItem";
import NoRecordFound from "assets/images/community_no_record_found.svg";

type Props = {
  data: PostFeed[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  error: string | undefined;
  reload: () => void;
  likeButtonCallback: (postId: number) => void;
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
    error,
    reload,
    likeButtonCallback
  }) => {
    const keyExtractor = useCallback(
      (item: PostFeed) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: PostFeed }) => {
        return (
          <FeedPostItem
            data={item}
            openCommentsScreen={openCommentsScreen}
            shouldPlayVideo={shouldPlayVideo}
            likeButtonCallback={likeButtonCallback}
          />
        );
      },
      [openCommentsScreen, shouldPlayVideo, likeButtonCallback]
    );

    return (
      <Screen style={styles.container}>
        {useLazyLoadInterface(
          <FlatListWithPb
            retryCallback={reload}
            removeClippedSubviews={true}
            initialNumToRender={4}
            maxToRenderPerBatch={4}
            windowSize={8}
            shouldShowProgressBar={shouldShowProgressBar}
            data={data}
            style={styles.list}
            contentContainerStyle={[
              listContentContainerStyle,
              { paddingHorizontal: SPACE.lg }
            ]}
            ItemSeparatorComponent={({}) => (
              <View style={listItemSeparator} />
            )}
            error={error}
            renderItem={listItem}
            keyExtractor={keyExtractor}
            onEndReached={onEndReached}
            isAllDataLoaded={isAllDataLoaded}
            pullToRefreshCallback={pullToRefreshCallback}
            noRecordFoundImage={<NoRecordFound />}
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
  list: {
    flex: 1
  },
  itemSeparator: {
    height: SPACE.lg
  }
});
