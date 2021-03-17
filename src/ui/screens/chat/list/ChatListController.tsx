import React, { FC, useLayoutEffect, useState } from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatAPis";
import { AppLog } from "utils/Util";
import ChatItem from "models/ChatItem";
import DataGenerator from "utils/DataGenerator";
import { ChatParamsLIst } from "routes/ChatParams";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsLIst,
  "ChatThread"
>;

type Props = {};

const dummyChats = DataGenerator.getChats();

export const ChatListController: FC<Props> = () => {
  const navigation = useNavigation<ChatListNavigationProp>();

  const [chats, setChats] = useState<ChatItem[]>(dummyChats);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Chat"
    });
  }, [navigation]);

  const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.logForcefully("Find chats" + errorBody);
      setChats(dataBody.data);
      onComplete?.();
    }
  };

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  const openChatThread = () => {
    navigation.navigate("ChatThread");
  };

  return (
    /* <ProgressErrorView
      data={chats}
      isLoading={loadChatsApi.loading}
      error={loadChatsApi.error}
      errorView={(message) => {
        return (
          <View>
            <AppLabel text={message} />
          </View>
        );
      }}>
      <ChatListScreen />
    </ProgressErrorView>*/
    <ChatListScreen data={chats} onItemClick={openChatThread} />
  );
};
