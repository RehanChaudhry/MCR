import { StyleSheet } from "react-native";
import React from "react";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import { ItemChatList } from "ui/components/molecules/item_chat/ItemChatList";
import BottomBreadCrumbs, {
  BreadCrumbsItem
} from "ui/components/templates/bottom_bread_crumbs/BottomBreadCrumbs";

type Props = {};

const items: string[] = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11"
];

type ConversationType = "Active" | "Archived";
const showConversation = (conversationType: ConversationType) => {
  AppLog.log(conversationType);
};

const breadCrumbsItems: BreadCrumbsItem[] = [
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

export const ChatListScreen = React.memo<Props>(() => {
  const renderItem = ({ item }: { item: string }) => {
    AppLog.log("rendering list item : " + JSON.stringify(item));
    return <ItemChatList />;
  };

  return (
    <Screen style={styles.container}>
      <FlatListWithPb
        shouldShowProgressBar={false}
        data={items}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={styles.list}
      />
      <BottomBreadCrumbs data={breadCrumbsItems} />
    </Screen>
  );
});

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
