import Chat from "assets/images/chat.svg";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import ChatItem, { SenderType } from "models/ChatItem";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";

type Props = {
  data: ChatItem[];
  sentMessageApi: (list: ChatItem[], message: ChatItem) => ChatItem[];
};

export const CommentsView = React.memo<Props>(
  ({ data, sentMessageApi }) => {
    let [comments, setComments] = useState<ChatItem[]>(data);
    const theme = usePreferredTheme();

    const renderItem = ({ item }: { item: ChatItem }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return <ItemChatThread item={item} />;
    };

    function sentMessage(text: string) {
      let chatMessage = DataGenerator.createChat(
        1009,
        ["Nikki Engelin"],
        false,
        SenderType.STUDENTS,
        1,
        require("assets/images/d_user_pic.png"),
        text
      );

      setComments(sentMessageApi(comments, chatMessage));
    }

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          shouldShowProgressBar={false}
          data={comments}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          style={[styles.list]}
          inverted={true}
          keyExtractor={(item, index) => index.toString()}
        />
        <WriteMessage
          btnPressCallback={sentMessage}
          appInputPlaceHolder={Strings.chatThreadScreen.typingHint}
          btnImage={() => (
            <Chat
              width={25}
              height={25}
              fill={theme.themedColors.primary}
            />
          )}
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
