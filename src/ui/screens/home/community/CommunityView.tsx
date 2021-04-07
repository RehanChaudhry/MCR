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
  openCommentsScreen?: () => void | undefined;
  shouldPlayVideo: boolean;
  openReportContentScreen?: () => void | undefined;
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
    openReportContentScreen
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
        />
      ),
      [openCommentsScreen, shouldPlayVideo, openReportContentScreen]
    );
    function getFeedsFilterData(): Item[] {
      return feedsFilterData.map((value) => {
        const item: Item = {
          title: value.type,
          onPress: () => {}
        };
        return item;
      });
    }
    return (
      <Screen style={styles.container}>
        {useLazyLoadInterface(
          <>
            <FlatListWithPb
              shouldShowProgressBar={shouldShowProgressBar}
              data={data}
              style={styles.list}
              renderItem={listItem}
              keyExtractor={keyExtractor}
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
