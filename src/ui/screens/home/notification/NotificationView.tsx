import React, { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { CircleImageWithText } from "ui/components/molecules/circle_image_with_text/CircleImageWithText";
import { NotiHeader } from "ui/screens/home/notification/NotiHeader";
import {
  listContentContainerStyle,
  listItemSeparator,
  shadowStyleProps
} from "utils/Util";
import { FONT_SIZE, SPACE } from "config/Dimens";
import Selector from "assets/images/selector.svg";
import { usePreferredTheme } from "hooks";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppDropdown } from "ui/components/organisms/app_dropdown/AppDropdown";
import NotificationData from "models/NotificationData";

type Props = {
  openMyProfileScreen: (notification: NotificationData) => void;
  notifications?: NotificationData[];
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  pullToRefreshCallback: (onComplete: () => void) => void;
  onChangeFilter: (textToFilter: string) => void;
  navigateToRequiredScreen: (notificationData: NotificationData) => void;
};

export const NotificationView = React.memo<Props>(
  ({
    notifications,
    openMyProfileScreen,
    shouldShowProgressBar,
    pullToRefreshCallback,
    onEndReached,
    isAllDataLoaded,
    onChangeFilter,
    navigateToRequiredScreen
  }) => {
    const theme = usePreferredTheme();
    let sharedDataRef = useRef("");
    const [dropDownSelectedItem, setDropDownSelectedItem] = useState("");

    const listItem = useCallback(
      ({ item, index }: { item: NotificationData; index: number }) => {
        return (
          <>
            <NotiHeader item={item} setSharedDataRef={sharedDataRef} />
            <CircleImageWithText
              key={index}
              actionOnPress={navigateToRequiredScreen}
              notification={item}
              userNameOnPress={openMyProfileScreen}
            />
          </>
        );
      },
      [openMyProfileScreen, navigateToRequiredScreen]
    );

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
                value: "View All",
                text: "View All"
              },
              {
                value: "Friend Request",
                text: "friend-request"
              },
              {
                value: "Roommate Request",
                text: "roommate-request"
              },
              { value: "Chat", text: "chat" },
              { value: "Conversation", text: "conversation" },
              { value: "Post", text: "post" },
              { value: "Announcement", text: "announcement" },
              {
                value: "Roommate Agreement",
                text: "roommate-agreement"
              },
              { value: "Roommate Group", text: "roommate-group" }
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
              sharedDataRef.current = "";
              onChangeFilter(item.text!);
              setDropDownSelectedItem(item.value);
            }}
            shouldShowCustomIcon={true}
          />
        </View>

        <FlatListWithPb
          shouldShowProgressBar={shouldShowProgressBar}
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={listItem}
          style={styles.list}
          noRecordFoundText={`You do not have any "${dropDownSelectedItem}" notifications for now.`}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
          pullToRefreshCallback={(_onComplete) => {
            sharedDataRef.current = "";
            pullToRefreshCallback(_onComplete);
          }}
          contentContainerStyle={[
            listContentContainerStyle,
            { paddingHorizontal: SPACE.lg }
          ]}
          ItemSeparatorComponent={() => <View style={listItemSeparator} />}
        />
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
    marginBottom: SPACE.lg
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
