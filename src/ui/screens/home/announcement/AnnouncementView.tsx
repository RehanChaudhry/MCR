import { SPACE } from "config";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { AnnouncementItem } from "ui/components/molecules/AnnouncementItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { listContentContainerStyle, listItemSeparator } from "utils/Util";

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  error: string | undefined;
  moveToProfileScreen: () => void;
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
    moveToProfileScreen
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
            onProfileImageClicked={moveToProfileScreen}
          />
        );
      },
      [openCommentsScreen, shouldPlayVideo, moveToProfileScreen]
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
  list: {
    flex: 1
  },
  itemSeparator: {
    height: SPACE.lg
  }
});
