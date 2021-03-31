import { StyleSheet, View } from "react-native";
import React, { useCallback, useState } from "react";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog, shadowStyleProps } from "utils/Util";
import { ItemChatList } from "ui/components/molecules/item_chat/ItemChatList";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import ChatItem from "models/ChatItem";
import { ChatHeader } from "ui/components/molecules/item_chat/ChatHeader";
import Strings from "config/Strings";
import SearchField from "ui/components/atoms/search_field/SearchField";
import { FONT_SIZE, SPACE, STRINGS } from "config";
import { moderateScale } from "config/Dimens";
import { usePreferredTheme } from "hooks";
import { ColorPalette } from "hooks/theme/ColorPaletteContainer";
type ConversationType = "Active" | "Archived";

interface ChatListProps {
  onItemClick: (item: ChatItem) => void;
  data: ChatItem[];
  pullToRefreshCallback: (onComplete: () => void) => void;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
}

const showConversation = (conversationType: ConversationType) => {
  AppLog.log(conversationType);
};

const breadCrumbsItems: Item[] = [
  {
    title: Strings.chatListScreen.activeConversations,
    onPress: () => {
      showConversation("Active");
    }
  },
  {
    title: Strings.chatListScreen.archivedConversations,
    onPress: () => {
      showConversation("Archived");
    }
  }
];

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
      data.filter((obj: ChatItem) => {
        return Object.values(obj).some((v) =>
          `${v}`.toLowerCase().includes(`${textToSearch}`.toLowerCase())
        );
      });

    const handleClick = useCallback((textToSearch?: string) => {
      lastHeaderTitle = "";

      textToSearch !== "" &&
        textToSearch !== undefined &&
        setItems(
          performSearch(textToSearch)
        ); /*||
        setItems(data);*/
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.logForcefully(
        "rendering list item : " + JSON.stringify(item)
      );
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
      <Screen style={styles.container}>
        <View style={styles.searchContainer(themedColors)}>
          <SearchField
            style={styles.search(themedColors)}
            textStyle={styles.searchText}
            placeholder={STRINGS.chatListScreen.placeholder_search_keyword}
            onChangeText={handleClick}
            searchIcon={true}
            clearIcon={true}
            iconColor={themedColors.interface[500]}
          />
        </View>

        <FlatListWithPb
          shouldShowProgressBar={false}
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={styles.list}
          pullToRefreshCallback={pullToRefreshCallback}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
        />
        <BottomBreadCrumbs data={breadCrumbsItems} />
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
      borderRadius: moderateScale(20),
      borderEndWidth: StyleSheet.hairlineWidth,
      backgroundColor: theme.interface[100],
      borderColor: theme.separator
    };
  },
  searchText: { fontSize: FONT_SIZE._2xsm },
  list: { flex: 1 },
  breadCrumbs: {},
  messageContainer: {}
});
