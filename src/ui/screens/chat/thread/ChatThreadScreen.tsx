import { StyleSheet } from "react-native";
import React from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { TypingComponent } from "ui/components/molecules/item_chat/TypingComponent";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";

type Props = {};

const items: string[] = ["1", "2", "3", "4", "5", "6", "7", "8"];

export const ChatThreadScreen = React.memo<Props>(() => {
  const renderItem = ({ item }: { item: string }) => {
    AppLog.log("rendering list item : " + JSON.stringify(item));
    return <ItemChatThread />;
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
      <TypingComponent />
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
  messageContainer: {}
});
