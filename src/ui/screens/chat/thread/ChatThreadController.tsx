import React, { FC, useLayoutEffect, useState } from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";
import { ChatParamsLIst } from "routes/ChatParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import DataGenerator from "utils/DataGenerator";
import ChatItem from "models/ChatItem";
import { useApi } from "repo/Client";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import ChatApis from "repo/chat/ChatAPis";
import { AppLog } from "utils/Util";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsLIst,
  "ChatThread"
>;

type Props = {};

const dummyChats = DataGenerator.createChatThread();

export const ChatThreadController: FC<Props> = () => {
  const navigation = useNavigation<ChatListNavigationProp>();

  const [chats, setChats] = useState<ChatItem[]>(dummyChats);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Allan & 2 more"
    });
  }, [navigation]);

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sentMessage = (message: ChatItem) => {};

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  return (
    <ProgressErrorView
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
      <ChatThreadScreen data={chats} sentMessageApi={sentMessage} />
    </ProgressErrorView>
  );
};
