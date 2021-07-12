import { SPACE } from "config";
import { useAuth, usePreferredTheme } from "hooks";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { PostFeed } from "models/api_responses/FetchPostFeedListResponseModel";
import { FilterCount } from "models/enums/FeedsTypeFilter";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FeedPostItem } from "ui/components/molecules/FeedPostItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import { listContentContainerStyle, listItemSeparator } from "utils/Util";
import NoRecordFound from "assets/images/community_no_record_found.svg";

type Props = {
  data: PostFeed[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  feedsFilterData: FilterCount[];
  openCommentsScreen?: (postId: number) => void;
  shouldPlayVideo: boolean;
  openReportContentScreen?: (postId: number) => void;
  error: string | undefined;
  filterDataBy: (type: string) => void;
  moveToProfileScreen?: (userId: number, name: string) => void;
  reload: () => void;

  likeButtonCallback: (postId: number) => void;
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
    filterDataBy,
    moveToProfileScreen,
    reload,
    likeButtonCallback
  }) => {
    const auth = useAuth();
    const theme = usePreferredTheme();
    const keyExtractor = useCallback(
      (item: PostFeed) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: PostFeed }) => (
        <FeedPostItem
          data={item}
          openCommentsScreen={openCommentsScreen}
          shouldPlayVideo={shouldPlayVideo}
          openReportContentScreen={openReportContentScreen}
          shouldShowRightIcon={item.postedBy !== auth.user?.profile?.id}
          onProfileImageClicked={moveToProfileScreen}
          likeButtonCallback={likeButtonCallback}
        />
      ),
      [
        openCommentsScreen,
        shouldPlayVideo,
        openReportContentScreen,
        auth,
        moveToProfileScreen,
        likeButtonCallback
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
              retryCallback={reload}
              removeClippedSubviews={true}
              initialNumToRender={4}
              maxToRenderPerBatch={4}
              windowSize={8}
              shouldShowProgressBar={shouldShowProgressBar}
              data={data}
              style={styles.list}
              renderItem={listItem}
              keyExtractor={keyExtractor}
              error={error}
              contentContainerStyle={[
                listContentContainerStyle,
                { paddingHorizontal: SPACE.lg }
              ]}
              ItemSeparatorComponent={({}) => (
                <View style={listItemSeparator} />
              )}
              onEndReached={onEndReached}
              isAllDataLoaded={isAllDataLoaded}
              pullToRefreshCallback={pullToRefreshCallback}
              noRecordFoundImage={
                <NoRecordFound
                  fillPrimary={theme.themedColors.primary}
                  fillSecondary={theme.themedColors.secondary}
                />
              }
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
  }
});
