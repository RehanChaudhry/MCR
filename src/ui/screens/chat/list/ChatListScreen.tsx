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

export const ChatListScreen = React.memo<ChatListProps>(
  ({ data, onItemClick }) => {
    AppLog.logForcefully("Rendering screen chat");
    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.logForcefully(
        "rendering list item : " + JSON.stringify(item)
      );
      return (
        <ItemChatList
          item={item}
          onPress={() => {
            onItemClick();
          }}
        />
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
