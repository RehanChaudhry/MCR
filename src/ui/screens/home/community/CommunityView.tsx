import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT_SIZE } from "config";
import Colors from "config/Colors";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import { FilterCount } from "models/enums/FeedsTypeFilter";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { HomeDrawerParamList } from "routes";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { CommunityItem } from "ui/components/molecules/community_item/CommunityItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";

type ProfileNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "Community"
>;

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  feedsFilterData: FilterCount[];
};

export const CommunityView = React.memo<Props>(
  ({
    data,
    shouldShowProgressBar,
    onEndReached,
    isAllDataLoaded,
    pullToRefreshCallback,
    feedsFilterData
  }) => {
    const navigation = useNavigation<ProfileNavigationProp>();
    const keyExtractor = useCallback(
      (item: CommunityAnnouncement) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: CommunityAnnouncement }) => (
        <CommunityItem communityItem={item} />
      ),
      []
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
      <View style={styles.container}>
        <AppLabel style={[{ alignSelf: "center" }]} text="Communities" />
        <AppLabel
          style={[
            {
              alignSelf: "center",
              padding: 20,
              fontSize: FONT_SIZE.md,
              margin: 10,
              backgroundColor: Colors.grey3
            }
          ]}
          text="Open Drawer"
          weight="bold"
          onPress={() => {
            navigation.openDrawer();
          }}
        />
        <FlatListWithPb
          shouldShowProgressBar={shouldShowProgressBar}
          data={data}
          style={styles.list}
          renderItem={listItem}
          keyExtractor={keyExtractor}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
          pullToRefreshCallback={pullToRefreshCallback}
        />
        <BottomBreadCrumbs data={getFeedsFilterData()} />
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    alignItems: "stretch",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: COLORS.backgroundColor,
    flex: 1
  },
  list: {
    flexGrow: 1,
    flexBasis: 0
  }
});
