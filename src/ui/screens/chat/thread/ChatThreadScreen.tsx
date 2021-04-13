import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import ChatItem, { SenderType } from "models/ChatItem";
import DataGenerator from "utils/DataGenerator";
import Strings from "config/Strings";
import { SPACE } from "config";

type Props = {
  data: ChatItem[];
  sentMessageApi: (list: ChatItem[], message: ChatItem) => ChatItem[];
};

export const ChatThreadScreen = React.memo<Props>(
  ({ data, sentMessageApi }) => {
    let [chats, setChats] = useState<ChatItem[]>(data);

    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return <ItemChatThread item={item} />;
    };

    function sentMessage(text: string) {
      let chatMessage = DataGenerator.createChat(
        1009,
        ["Phoenix Walker"],
        false,
        SenderType.STUDENTS,
        2,
        "https://vrs.amsi.org.au/wp-content/uploads/sites/78/2017/12/tobinsouth_vrs_2017-18.jpeg",
        text
      );

      setChats(sentMessageApi(chats, chatMessage));
    }

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          shouldShowProgressBar={false}
          data={chats}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          contentContainerStyle={styles.listContainer}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={[styles.list]}
          inverted={true}
          keyExtractor={(item, index) => index.toString()}
        />
        <WriteMessage
          btnPressCallback={sentMessage}
          appInputPlaceHolder={Strings.chatThreadScreen.typingHint}
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
  messageContainer: {},
  listContainer: { padding: SPACE.lg },
  itemSeparator: {
    height: SPACE.lg
  }
});
