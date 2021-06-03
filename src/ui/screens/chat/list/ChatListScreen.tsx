import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { StyleSheet, View } from "react-native";
import React, { useCallback } from "react";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import {
  AppLog,
  listContentContainerStyle,
  listItemSeparator,
  shadowStyleProps
} from "utils/Util";
import { ItemChatList } from "ui/components/molecules/item_chat/ItemChatList";
import { ChatHeader } from "ui/components/molecules/item_chat/ChatHeader";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
import { Conversation } from "models/api_responses/ChatsResponseModel";

interface ChatListProps {
  onItemClick: (item: Conversation) => void;
  data: Conversation[] | undefined;
  pullToRefreshCallback: (onComplete?: () => void) => void;
  onEndReached: () => void;
  shouldShowProgressBar: boolean;
  isAllDataLoaded: boolean;
  error: string | undefined;
  performSearch: (keyword: string) => void;
}

let lastHeaderTitle = "";
export const ChatListScreen = React.memo<ChatListProps>(
  ({
    error,
    data,
    onItemClick,
    shouldShowProgressBar,
    pullToRefreshCallback,
    onEndReached,
    isAllDataLoaded,
    performSearch
  }) => {
    AppLog.log("Rendering chat screen...");
    const { themedColors } = usePreferredTheme();

    const handleClick = useCallback((textToSearch?: string) => {
      if (textToSearch !== undefined) {
        lastHeaderTitle = "";
        performSearch(textToSearch);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItem = ({
      item,
      index
    }: {
      item: Conversation;
      index: number;
    }) => {
      AppLog.log("rendering chat list item : " + JSON.stringify(item));
      if (index === 0) {
        lastHeaderTitle = "";
      }
      return (
        <>
          <ChatHeader
            chatItem={new Conversation(item)}
            lastHeaderTitle={lastHeaderTitle}
            onHeaderCreated={(title: string) => {
              lastHeaderTitle = title;
              AppLog.log(
                "Chat header => lastHeaderTitle " + lastHeaderTitle
              );
            }}
          />
          <ItemChatList
            item={new Conversation(item)}
            onPress={() => {
              onItemClick(item);
            }}
          />
        </>
      );
    };

    return (
      <Screen style={styles.container} shouldAddBottomInset={false}>
        <View style={styles.searchContainer(themedColors)}>
          <SearchField
            style={styles.search(themedColors)}
            textStyle={styles.searchText}
            placeholder={STRINGS.chatListScreen.placeholder_search_keyword}
            onChangeText={handleClick}
            clearIcon={true}
            iconColor={themedColors.interface[500]}
          />
        </View>

        {useLazyLoadInterface(
          <>
            <FlatListWithPb
              removeClippedSubviews={true}
              shouldShowProgressBar={shouldShowProgressBar}
              error={error}
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              retryCallback={pullToRefreshCallback}
              pullToRefreshCallback={pullToRefreshCallback}
              onEndReached={onEndReached}
              isAllDataLoaded={isAllDataLoaded}
              contentContainerStyle={listContentContainerStyle}
              ItemSeparatorComponent={({}) => (
                <View style={listItemSeparator} />
              )}
            />
          </>
        )}
      </Screen>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1
  },
  searchContainer: (theme: ColorPalette) => {
    return {
      backgroundColor: theme.background,
      paddingBottom: SPACE.sm,
      paddingHorizontal: SPACE.md,
      ...shadowStyleProps
    };
  },
  search: (theme: ColorPalette) => {
    return {
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.interface[100],
      borderColor: theme.separator
    };
  },
  searchText: { fontSize: FONT_SIZE.sm },
  list: { flex: 1 },
  breadCrumbs: {},
  messageContainer: {},
  separator: {
    marginLeft: 75,
    marginRight: SPACE.lg
  }
});
