import Chat from "assets/images/chat.svg";
import { SPACE } from "config";
import Strings from "config/Strings";
import { usePreferredTheme } from "hooks";
import React from "react";
import { StyleSheet, View } from "react-native";
import Screen from "ui/components/atoms/Screen";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import { FlatListWithPb } from "ui/components/organisms/flat_list/FlatListWithPb";
import { AppLog } from "utils/Util";
import { Comment } from "models/api_responses/CommentsResponseModel";
import { ItemComment } from "ui/components/molecules/item_comment/ItemComment";

type Props = {
  data: Comment[] | undefined;
  sentMessageApi: (comment: string) => void;
  shouldShowProgressBar: boolean;
  onEndReached: () => void;
  isAllDataLoaded: boolean;
  error: string | undefined;
  pullToRefreshCallback: (onComplete: () => void) => void;
};

export const CommentsView = React.memo<Props>(
  ({
    data,
    sentMessageApi,
    shouldShowProgressBar,
    onEndReached,
    error,
    isAllDataLoaded,
    pullToRefreshCallback
  }) => {
    const theme = usePreferredTheme();

    const renderItem = ({ item }: { item: Comment }) => {
      AppLog.log("rendering list item : " + JSON.stringify(item));
      return <ItemComment item={item} />;
    };

    function sentMessage(text: string) {
      sentMessageApi(text);
    }

    return (
      <Screen style={styles.container}>
        <FlatListWithPb
          removeClippedSubviews={true}
          shouldShowProgressBar={shouldShowProgressBar}
          data={data}
          style={[styles.list]}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          error={error}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => (
            <View style={styles.itemSeparator} />
          )}
          onEndReached={onEndReached}
          isAllDataLoaded={isAllDataLoaded}
          pullToRefreshCallback={pullToRefreshCallback}
        />

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
