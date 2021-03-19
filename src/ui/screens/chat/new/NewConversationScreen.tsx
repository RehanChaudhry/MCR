import { StyleSheet } from "react-native";
import React from "react";
import { WriteMessage } from "ui/components/molecules/item_chat/WriteMessage";
import Screen from "ui/components/atoms/Screen";
import { AppLog, SvgProp } from "utils/Util";
import { Color, NumberProp } from "react-native-svg";
import Plus from "assets/images/plus.svg";
import { usePreferredTheme } from "hooks";
import { moderateScale } from "config/Dimens";

type Props = {};

export const NewConversationScreen = React.memo<Props>(({}) => {
  const { themedColors } = usePreferredTheme();
  /*   let [chats, setChats] = useState<ChatItem[]>(data);

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
        };*/

  const plusIcon: SvgProp = (
    color?: Color,
    width?: NumberProp,
    height?: NumberProp
  ) => {
    AppLog.log("color : " + color + " " + width + " " + height); //just to avoid warning
    return (
      <Plus
        testID="icon"
        width={moderateScale(12)}
        height={moderateScale(12)}
        fill={themedColors.primary}
      />
    );
  };

  const appInputCallback = (text: string) => {
    AppLog.logForcefully("AppInput field callback " + text);
  };

  return (
    <Screen style={styles.container}>
      {/* <FlatListWithPb
        shouldShowProgressBar={false}
        data={chats}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={[styles.list]}
        inverted={true}
        keyExtractor={(item, index) => index.toString()}
      />*/}

      <WriteMessage
        btnImage={plusIcon}
        appInputFieldCallback={appInputCallback}
        appInputPlaceHolder="Start typing student name"
        btnPressCallback={appInputCallback}
      />
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
