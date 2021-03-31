import useLazyLoadInterface from "hooks/useLazyLoadInterface";
import { StyleSheet, View } from "react-native";
import React from "react";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
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
  ({ data, onItemClick }) => {
    const { themedColors } = usePreferredTheme();
    AppLog.log("Rendering chat screen...");
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
      <Screen style={styles.container}>
        <View style={styles.searchContainer(themedColors)}>
          <SearchField
            style={styles.search(themedColors)}
            textStyle={styles.searchText}
            placeholder={STRINGS.chatListScreen.placeholder_search_keyword}
            onChangeText={(textToSearch?: string) => {
              AppLog.log(textToSearch);
              //  keyword.current = textToSearch;
              //  onFilterChange(keyword.current, gender.current);
            }}
            searchIcon={true}
            clearIcon={true}
            iconColor={themedColors.interface[500]}
          />
        </View>

        {useLazyLoadInterface(
          <AppLabel text="Loading..." />,
          <>
            <FlatListWithPb
              shouldShowProgressBar={false}
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              removeClippedSubviews={true}
              style={styles.list}
            />
            <BottomBreadCrumbs data={breadCrumbsItems} />
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
      paddingBottom: SPACE.md,
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
