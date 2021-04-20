import { SPACE } from "config";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import { FilterCount } from "models/enums/FeedsTypeFilter";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { CommunityItem } from "ui/components/molecules/community_item/CommunityItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  feedsFilterData: FilterCount[];
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  openReportContentScreen?: () => void | undefined;
  error: string | undefined;
  likeDislikeAPi: (postId: number) => Promise<boolean>;
  filterDataBy: (type: string) => void;
};

export const CommunityView = React.memo<Props>(
  ({
    data,
    shouldShowProgressBar,
    onEndReached,
    isAllDataLoaded,
    pullToRefreshCallback,
    feedsFilterData,
    openCommentsScreen,
    shouldPlayVideo,
    openReportContentScreen,
    error,
    likeDislikeAPi,
    filterDataBy
  }) => {
    const keyExtractor = useCallback(
      (item: CommunityAnnouncement) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: CommunityAnnouncement }) => (
        <CommunityItem
          communityItem={item}
          openCommentsScreen={openCommentsScreen}
          shouldPlayVideo={shouldPlayVideo}
          openReportContentScreen={openReportContentScreen}
          likeDislikeAPi={likeDislikeAPi}
        />
      ),
      [
        likeDislikeAPi,
        openCommentsScreen,
        shouldPlayVideo,
        openReportContentScreen
      ]
    );
    function getFeedsFilterData(): Item[] {
      return feedsFilterData.map((value) => {
        const item: Item = {
          title: value.type,
          onPress: () => {
            filterDataBy(value.type);
          }
        };
        return item;
      });
    }
    return (
      <Screen style={styles.container}>
        {useLazyLoadInterface(
          <>
            <FlatListWithPb
              removeClippedSubviews={true}
              shouldShowProgressBar={shouldShowProgressBar}
              data={data}
              style={styles.list}
              renderItem={listItem}
              keyExtractor={keyExtractor}
              error={error}
              contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
              onEndReached={onEndReached}
              isAllDataLoaded={isAllDataLoaded}
              pullToRefreshCallback={pullToRefreshCallback}
            />
            <BottomBreadCrumbs data={getFeedsFilterData()} />
          </>
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
