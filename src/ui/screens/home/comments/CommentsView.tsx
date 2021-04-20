import Chat from "assets/images/chat.svg";
import { SPACE } from "config";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import ChatItem, { SenderType } from "models/ChatItem";
import React, { useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import DataGenerator from "utils/DataGenerator";
import { AppLog } from "utils/Util";
import { Comment } from "models/api_responses/CommentsResponseModel";
import { ItemComment } from "ui/components/molecules/item_comment/ItemComment";

type Props = {
  data: Comment[];
  sentMessageApi: (list: ChatItem[], message: ChatItem) => ChatItem[];
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  error: string | undefined;
};

export const CommentsView = React.memo<Props>(
  ({
    data,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sentMessageApi,
    shouldShowProgressBar,
    onEndReached,
    error,
    isAllDataLoaded
  }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let [comments, setComments] = useState<Comment[]>(data);
    const theme = usePreferredTheme();
    const scrollRef = useRef<ScrollView | null>(null);
    scrollRef.current?.scrollToEnd({
      animated: true
    });

    const renderItem = ({ item }: { item: Comment }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return <ItemComment item={item} />;
    };

    function sentMessage(text: string) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      let chatMessage = DataGenerator.createChat(
        1009,
        ["Nikki Engelin"],
        false,
        SenderType.STUDENTS,
        1,
        "https://www.law.uchicago.edu/files/styles/extra_large/public/2018-03/theisen_tarra.jpg?itok=5iSSWAci",
        text
      );

      //  setComments(sentMessageApi(comments, chatMessage));
    }

    useEffect(() => {
      setTimeout(() => {
        scrollRef.current?.scrollTo({
          x: 0,
          animated: true
        });
      }, 100);
    }, [comments]);

    return (
      <Screen style={styles.container}>
        <ScrollView ref={scrollRef}>
          <FlatListWithPb
            shouldShowProgressBar={shouldShowProgressBar}
            data={data}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            removeClippedSubviews={true}
            style={[styles.list]}
            contentContainerStyle={styles.listContainer}
            inverted={true}
            error={error}
            onEndReached={onEndReached}
            isAllDataLoaded={isAllDataLoaded}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparator} />
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
        <WriteMessage
          btnPressCallback={sentMessage}
          appInputPlaceHolder={Strings.chatThreadScreen.typingHint}
          btnImage={() => (
            <Chat
              width={24}
              height={24}
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
  messageContainer: {},
  listContainer: { padding: SPACE.lg },
  itemSeparator: {
    height: SPACE.lg
  }
});
