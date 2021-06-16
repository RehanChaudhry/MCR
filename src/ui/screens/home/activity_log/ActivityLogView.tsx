import React, { useCallback, useRef } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import Selector from "assets/images/selector.svg";
import ActivityLogItem from "ui/components/organisms/activity_log_item/ActivityLogItem";
import { getActivityTypeFilterData } from "models/enums/ActivityType";
import { shadowStyleProps } from "utils/Util";
import ActivityLog from "models/ActivityLog";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { ActivityLogHeader } from "ui/screens/home/activity_log/ActivityLogHeader";

type Props = {
  shouldShowProgressBar: boolean;
  activityLogs?: ActivityLog[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  onChangeFilter: (textToFilter: string) => void;
};

export const ActivityLogView = React.memo<Props>(
  ({
    shouldShowProgressBar,
    activityLogs,
    pullToRefreshCallback,
    onEndReached,
    onChangeFilter
  }) => {
    const { themedColors } = usePreferredTheme();
    let sharedDataRef = useRef("");

    const listItem = useCallback(({ item }: { item: ActivityLog }) => {
      return (
        <>
          <ActivityLogHeader
            item={item}
            setSharedDataRef={sharedDataRef}
          />
          <ActivityLogItem activityLog={item} />
        </>
      );
    }, []);

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
            preselectedItemString={getActivityTypeFilterData()[0].value}
            items={getActivityTypeFilterData()}
            selectedItemCallback={(item) => {
              onChangeFilter(item.text!);
            }}
          />
        </View>

        {activityLogs && (
          <FlatListWithPb
            shouldShowProgressBar={shouldShowProgressBar}
            data={activityLogs}
            keyExtractor={(item) => item.id.toString()}
            renderItem={listItem}
            style={styles.list}
            onEndReached={onEndReached}
            pullToRefreshCallback={(_onComplete) => {
              sharedDataRef.current = "";
              pullToRefreshCallback(_onComplete);
            }}
            contentContainerStyle={[{ paddingHorizontal: SPACE.lg }]}
          />
        )}
      </Screen>
    );
  }
);

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
  headerContainer: { paddingVertical: SPACE.lg },
  headerText: { fontSize: FONT_SIZE.xs },
  loadMore: {
    marginTop: SPACE.lg,
    height: SPACE._3xl,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  list: {
    flex: 1
  }
});
