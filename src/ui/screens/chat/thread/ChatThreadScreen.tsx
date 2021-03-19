import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import ChatItem, { SenderType } from "models/ChatItem";
import DataGenerator from "utils/DataGenerator";

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

    const sentMessage = (text: string) => {
      let chatMessage = DataGenerator.createChat(
        1009,
        ["Nikki Engelin"],
        false,
        SenderType.STUDENTS,
        1,
        require("assets/images/d_user_pic.png"),
        text
      );

      updateMessagesList(chatMessage);
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
        <WriteMessage
          btnPressCallback={sentMessage}
          appInputPlaceHolder="Start typing your message"
        />
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
