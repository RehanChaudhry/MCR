import React, { useCallback, useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import Selector from "assets/images/selector.svg";
import ActivityLogItem from "ui/components/organisms/activity_log_item/ActivityLogItem";
import { getActivityTypeFilterData } from "models/enums/ActivityType";
import { Section } from "utils/SectionListHelper";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { shadowStyleProps } from "utils/Util";
import ActivityLog from "models/ActivityLog";
import { AppLoadMore } from "ui/components/atoms/app_load_more/AppLoadMore";

type Props = {
  isApiLoading: boolean;
  activityLogs?: Section<ActivityLog>[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  selectedItem: (textToFilter: string) => void;
};

export const ActivityLogView: React.FC<Props> = ({
  isApiLoading,
  activityLogs,
  pullToRefreshCallback,
  onEndReached,
  selectedItem
}: Props) => {
  const { themedColors } = usePreferredTheme();
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const renderItem = ({ item }: { item: ActivityLog }) => (
    <ActivityLogItem activityLog={new ActivityLog(item)} />
  );

  const headerView = ({ section }: { section: Section<ActivityLog> }) => {
    // AppLog.log(`rendering HeaderView ${section.header.key()}`);

    return (
      <View
        style={[
          styles.headerContainer,
          { backgroundColor: themedColors.backgroundSecondary }
        ]}>
        <AppLabel
          text={section.title}
          style={[
            styles.headerText,
            { color: themedColors.interface[600] }
          ]}
          weight={"semi-bold"}
        />
      </View>
    );
  };

  const footerWrapper = useCallback(() => {
    return (
      <>
        {isApiLoading && activityLogs !== undefined && (
          <View style={styles.loadMore}>
            <AppLoadMore testID="loader" />
          </View>
        )}
      </>
    );
  }, [isApiLoading, activityLogs]);

  return (
    <Screen
      style={styles.container}
      bottomSafeAreaColor={themedColors.backgroundSecondary}>
      <View
        style={[
          styles.dropdownContainer,
          { backgroundColor: themedColors.background }
        ]}>
        <AppDropdown
          style={[
            styles.dropDown,
            { backgroundColor: themedColors.interface[100] }
          ]}
          textStyle={styles.filterText}
          shouldShowCustomIcon={true}
          dropDownIcon={() => (
            <Selector
              fill={themedColors.interface[500]}
              width={20}
              height={20}
            />
          )}
          title={getActivityTypeFilterData()[0].value}
          items={getActivityTypeFilterData()}
          selectedItemCallback={(item) => {
            selectedItem(item.text!);
          }}
        />
      </View>
      {activityLogs && (
        <SectionList
          initialNumToRender={10}
          onEndReachedThreshold={0.5}
          style={styles.activityLogList}
          sections={activityLogs}
          renderSectionHeader={headerView}
          renderItem={renderItem}
          onEndReached={onEndReached}
          onRefresh={() => {
            setRefreshing(true);
            pullToRefreshCallback?.(() => {
              setRefreshing(false);
            });
          }}
          refreshing={isRefreshing}
          keyExtractor={(item) => item.id.toString()}
          stickySectionHeadersEnabled={true}
          renderSectionFooter={footerWrapper}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dropdownContainer: {
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.sm,
    ...shadowStyleProps
  },
  activityLogList: { flex: 1 },
  dropDown: {
    borderRadius: 21,
    height: 42,
    paddingHorizontal: SPACE.xs
  },
  filterText: { fontSize: FONT_SIZE.sm },
  separator: { height: SPACE.md },
  headerContainer: { padding: SPACE.lg },
  headerText: { fontSize: FONT_SIZE.xs },
  loadMore: {
    height: 30,
    justifyContent: "center",
    flexDirection: "column"
  }
});
