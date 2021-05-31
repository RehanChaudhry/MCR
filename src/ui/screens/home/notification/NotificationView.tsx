import React from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { CircleImageWithText } from "ui/components/molecules/circle_image_with_text/CircleImageWithText";
import { AppLog, shadowStyleProps } from "utils/Util";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import { FONT_SIZE, SPACE } from "config/Dimens";
import Selector from "assets/images/selector.svg";
import { usePreferredTheme } from "hooks";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import NotificationData from "models/NotificationData";

type Props = {
  openMyProfileScreen: () => void;
  notifications?: NotificationData[];
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  selectedItem: (textToFilter: string) => void;
};

export const NotificationView = React.memo<Props>(
  ({
    notifications,
    openMyProfileScreen,
    shouldShowProgressBar,
    pullToRefreshCallback,
    onEndReached,
    isAllDataLoaded,
    selectedItem
  }) => {
    let previousItemHours = "";
    const theme = usePreferredTheme();

    const getHours = (prevDate: Date) => {
      const currDate1 = new Date();
      let d1: any = new Date(currDate1); //firstDate
      let d2: any = new Date(prevDate); //SecondDate
      let diff = Math.abs(d1 - d2);
      const hours = diff / (1000 * 60 * 60); //in milliseconds

      return parseInt(hours.toFixed(0));
    };

    const getHeader = (label: string, style?: StyleProp<ViewStyle>) => {
      return (
        <AppLabel
          text={label}
          style={[
            styles.header,
            style,
            { color: theme.themedColors.interface["600"] }
          ]}
          weight={"semi-bold"}
        />
      );
    };

    const getSortedItems = (hours: number) => {
      let label = "NEW NOTIFICATIONS";
      let tag = "3";
      if (hours > 48) {
        tag = "3";
      } else if (hours >= 0 && hours <= 24) {
        tag = "1";
      } else if (hours > 24 || hours < 48) {
        tag = "2";
      }

      if (previousItemHours !== tag && tag === "1") {
        previousItemHours = tag;
        return getHeader(label, styles.mainContanier);
      } else if (previousItemHours !== tag && tag === "3") {
        previousItemHours = tag;
        label = "OLDER NOTIFICATIONS";
        return getHeader(label);
      } else if (previousItemHours !== tag && tag === "2") {
        previousItemHours = tag;
        label = "YESTERDAY";
        return getHeader(label);
      }
    };

    const listItem = ({
      item,
      index
    }: {
      item: NotificationData;
      index: number;
    }) => {
      // @ts-ignore
      return (
        <View>
          {getSortedItems(getHours(notifications[index].createdAt))}
          <CircleImageWithText
            key={index}
            notifications={new NotificationData(item)}
            userNameOnPress={openMyProfileScreen}
          />
        </View>
      );
    };

    AppLog.logForcefully("progress" + shouldShowProgressBar);

    return (
      <Screen style={styles.container}>
        <View
          style={[
            styles.dropDownBar,
            { backgroundColor: theme.themedColors.background }
          ]}>
          <AppDropdown
            items={[
              {
                value: "Filter by notification type",
                text: "Filter by notification type"
              },
              {
                value: "View Friend Request",
                text: "View Friend Request"
              },
              { value: "View Profile", text: "View Profile" },
              {
                value: "View Roommate Request",
                text: "View Roommate Request"
              },
              { value: "View Announcement", text: "View Announcement" },
              { value: "View Message", text: "View Message" },
              { value: "View Post", text: "View Post" },
              {
                value: "View Roommate Request",
                text: "roommate-request"
              }
            ]}
            title={"Filter by notification type"}
            textStyle={styles.filterText}
            dropDownIcon={() => (
              <Selector
                width={20}
                height={20}
                fill={theme.themedColors.interface["600"]}
              />
            )}
            style={[
              styles.dropDown,
              { backgroundColor: theme.themedColors.interface["100"] }
            ]}
            selectedItemCallback={(item) => {
              selectedItem(item.text!);
            }}
            shouldShowCustomIcon={true}
          />
        </View>
        {useLazyLoadInterface(
          <>
            {notifications && (
              <FlatListWithPb
                shouldShowProgressBar={shouldShowProgressBar}
                data={notifications}
                keyExtractor={(item) => item.id.toString()}
                renderItem={listItem}
                style={styles.list}
                onEndReached={onEndReached}
                isAllDataLoaded={isAllDataLoaded}
                pullToRefreshCallback={pullToRefreshCallback}
              />
            )}
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
  header: {
    fontSize: FONT_SIZE.xs,
    marginBottom: SPACE.lg,
    marginLeft: SPACE.lg
  },
  mainContanier: { marginTop: SPACE.lg },
  dropDown: {
    borderRadius: 21,
    height: 42,
    paddingHorizontal: SPACE.xs
  },
  dropDownBar: {
    paddingHorizontal: SPACE.md,
    paddingVertical: SPACE.sm,
    ...shadowStyleProps
  },
  filterText: { fontSize: FONT_SIZE.sm },
  list: {
    flex: 1
  },
  loadMore: {
    height: 30,
    justifyContent: "center",
    flexDirection: "column"
  }
});
