import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog, shadowStyleProps } from "utils/Util";
import { ItemChatList } from "ui/components/molecules/item_chat/ItemChatList";
import ChatItem from "models/ChatItem";
import { ChatHeader } from "ui/components/molecules/item_chat/ChatHeader";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";

interface ChatListProps {
  onItemClick: (item: ChatItem) => void;
  data: ChatItem[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
}

let lastHeaderTitle = "";
export const ChatListScreen = React.memo<ChatListProps>(
  ({
    data,
    onItemClick,
    pullToRefreshCallback,
    onEndReached,
    isAllDataLoaded
  }) => {
    AppLog.log("Rendering chat screen...");

    const { themedColors } = usePreferredTheme();
    let [items, setItems] = useState<ChatItem[]>(data);

    const performSearch = (textToSearch: string) =>
      items.filter((obj: ChatItem) => {
        return Object.values(obj).some((v) => {
          AppLog.logForcefully("condition coming " + v);
          AppLog.logForcefully(
            `${v}`.toLowerCase().includes(`${textToSearch}`.toLowerCase())
          );
          return `${v}`
            .toLowerCase()
            .includes(`${textToSearch}`.toLowerCase());
        });
      });

    const handleClick = useCallback((textToSearch?: string) => {
      lastHeaderTitle = "";

      textToSearch !== "" && textToSearch !== undefined
        ? setItems(performSearch(textToSearch))
        : setItems(data);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return (
        <>
          <ChatHeader
            chatItem={item}
            lastHeaderTitle={lastHeaderTitle}
            onHeaderCreated={(title: string) => {
              lastHeaderTitle = title;
            }}
          />
          <ItemChatList
            item={item}
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
              shouldShowProgressBar={false}
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              showsVerticalScrollIndicator={false}
              style={styles.list}
              pullToRefreshCallback={pullToRefreshCallback}
              onEndReached={onEndReached}
              isAllDataLoaded={isAllDataLoaded}
              contentContainerStyle={{ paddingBottom: SPACE.md }}
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
