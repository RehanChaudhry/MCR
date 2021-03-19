import { StyleSheet } from "react-native";
import React from "react";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import { ItemChatList } from "ui/components/molecules/item_chat/ItemChatList";
import BottomBreadCrumbs, {
  Item
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";
import ChatItem from "models/ChatItem";
import { ChatHeader } from "ui/components/molecules/item_chat/ChatHeader";
type ConversationType = "Active" | "Archived";

const showConversation = (conversationType: ConversationType) => {
  AppLog.log(conversationType);
};

const breadCrumbsItems: Item[] = [
  {
    title: "Active Conversations",
    onPress: () => {
      showConversation("Active");
    }
  },
  {
    title: "Archived",
    onPress: () => {
      showConversation("Archived");
    }
  }
];

interface ChatListProps {
  onItemClick: () => void;
  data: ChatItem[];
}

let lastHeaderTitle = "";
export const ChatListScreen = React.memo<ChatListProps>(
  ({ data, onItemClick }) => {
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
              onItemClick();
            }}
          />
        </>
      );
    };

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          shouldShowProgressBar={false}
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={styles.list}
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
  list: {
    flex: 1
  },
  breadCrumbs: {},
  messageContainer: {}
});
