import { usePreferredTheme } from "hooks";
import { StyleSheet } from "react-native";
import React from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { listContentContainerStyle } from "utils/Util";
import Strings from "config/Strings";
import { SPACE } from "config";
import Message from "models/Message";
import ChatNoRecordFound from "assets/images/chat_no_record_found.svg";

type Props = {
  data: Message[] | undefined;
  sentMessageApi: (text: string) => void;
  shouldShowProgressBar: boolean;
  isAllDataLoaded: boolean;
  error: string | undefined;
  onEndReached: () => void;
  retry?: (message: Message) => void;
  retryCallback: () => void;
};

export const ChatThreadScreen = React.memo<Props>(
  ({
    data,
    sentMessageApi,
    shouldShowProgressBar,
    isAllDataLoaded,
    error,
    onEndReached,
    retry,
    retryCallback
  }) => {
    const theme = usePreferredTheme();
    const renderItem = ({ item }: { item: Message | undefined }) => {
      //AppLog.log(() => "rendering list item : " + JSON.stringify(item));
      return <ItemChatThread item={item} retry={retry} />;
    };

    function sentMessage(text: string) {
      sentMessageApi(text);
    }

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          data={data}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          style={[styles.list]}
          inverted={true}
          shouldShowProgressBar={shouldShowProgressBar}
          error={error}
          isAllDataLoaded={isAllDataLoaded}
          onEndReached={onEndReached}
          retryCallback={retryCallback}
          keyExtractor={(item) => item.id!.toString()}
          contentContainerStyle={[
            listContentContainerStyle,
            { paddingHorizontal: SPACE.lg, paddingBottom: 0 }
          ]}
          noRecordFoundImage={
            <ChatNoRecordFound
              fillPrimary={theme.themedColors.primary}
              fillSecondary={theme.themedColors.secondary}
            />
          }
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
  messageContainer: {}
});
