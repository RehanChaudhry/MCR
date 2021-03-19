import { DrawerNavigationProp } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";
import { COLORS, FONT_SIZE } from "config";
import Colors from "config/Colors";
import { CommunityAnnouncement } from "models/api_responses/CommunityAnnouncementResponseModel";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { HomeDrawerParamList } from "routes";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { AnnouncementItem } from "ui/components/molecules/AnnouncementItem";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";

type ProfileNavigationProp = DrawerNavigationProp<
  HomeDrawerParamList,
  "Announcement"
>;

type Props = {
  data: CommunityAnnouncement[] | undefined;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
};

export const AnnouncementView = React.memo<Props>(
  ({
    data,
    shouldShowProgressBar,
    onEndReached,
    isAllDataLoaded,
    pullToRefreshCallback
  }) => {
    const navigation = useNavigation<ProfileNavigationProp>();
    const keyExtractor = useCallback(
      (item: CommunityAnnouncement) => item.id.toString(),
      []
    );

    const listItem = useCallback(
      ({ item }: { item: CommunityAnnouncement }) => (
        <AnnouncementItem announcementItem={item} />
      ),
      []
    );
    return (
      <View style={styles.container}>
        <AppLabel style={[{ alignSelf: "center" }]} text="Announcement" />
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
