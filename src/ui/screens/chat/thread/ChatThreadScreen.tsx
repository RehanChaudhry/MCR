import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { TypingComponent } from "ui/components/molecules/item_chat/TypingComponent";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import ChatItem from "models/ChatItem";

type Props = {
  data: ChatItem[];
  sentMessageApi: (message: ChatItem) => void;
};

export const ChatThreadScreen = React.memo<Props>(
  ({ data, sentMessageApi }) => {
    let [chats, setChats] = useState<ChatItem[]>(data);

    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return <ItemChatThread item={item} />;
    };

    const updateMessagesList = (message: ChatItem) => {
      sentMessageApi(message);

      let newList: ChatItem[] = [];

      newList.push(message);
      newList.push(...chats);

      setChats(newList);
    };

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          shouldShowProgressBar={false}
          data={chats}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={[styles.list]}
          inverted={true}
          keyExtractor={(item, index) => index.toString()}
        />
        <TypingComponent updateMessagesList={updateMessagesList} />
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
  messageContainer: {}
});
