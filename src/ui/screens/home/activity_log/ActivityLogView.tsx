import React, { useState } from "react";
import { SectionList, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { FONT_SIZE, SPACE } from "config";
import { usePreferredTheme } from "hooks";
import ActivityLog from "models/ActivityLog";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import { genders } from "models/enums/EGender";
import { moderateScale } from "config/Dimens";
import Selector from "assets/images/selector.svg";
import ActivityLogItem from "ui/components/organisms/activity_log_item/ActivityLogItem";
import { getActivityTypeFilterData } from "models/enums/ActivityType";
import { toSectionList } from "utils/SectionListHelper";

type Props = {
  isApiLoading: boolean;
  activityLogs?: ActivityLog[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
};

export const ActivityLogView: React.FC<Props> = ({
  isApiLoading,
  activityLogs,
  pullToRefreshCallback,
  onEndReached,
  isAllDataLoaded
}: Props) => {
  const { themedColors } = usePreferredTheme();
  const [isRefreshing, setRefreshing] = useState<boolean>(false);

  const renderItem = ({ item }: { item: ActivityLog }) => (
    <ActivityLogItem activityLog={item} />
  );

  return (
    <Screen style={styles.container}>
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
            <Selector fill={themedColors.interface[500]} />
          )}
          title={genders[0].title}
          items={getActivityTypeFilterData()}
          selectedItemCallback={(_) => {}}
        />
      </View>
      {!isApiLoading && activityLogs && (
        <SectionList
          style={styles.activityLogList}
          sections={toSectionList(activityLogs)}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          onEndReached={isAllDataLoaded ? undefined : onEndReached}
          onRefresh={() => {
            setRefreshing(true);
            pullToRefreshCallback?.(() => {
              setRefreshing(false);
            });
          }}
          refreshing={isRefreshing}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  dropdownContainer: { padding: SPACE.md },
  activityLogList: { flex: 1 },
  dropDown: {
    borderRadius: moderateScale(20),
    height: moderateScale(40)
  },
  filterText: { fontSize: FONT_SIZE._2xsm },
  separator: { height: SPACE.md }
});
