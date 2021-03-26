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
import { ChatParamsList } from "routes/ChatStack";
import ProgressErrorView from "ui/components/templates/progress_error_view/ProgressErrorView";
import { View } from "react-native";
import { AppLabel } from "ui/components/atoms/app_label/AppLabel";
import Strings from "config/Strings";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsList,
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
      headerTitle: () => (
        <HeaderTitle text={Strings.chatListScreen.title} />
      )
    });
  }, [navigation]);

  const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.log("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.log("Find chats" + errorBody);
      setChats(dataBody.data);
      onComplete?.();
    }
  };

  /* useEffect(() => {
    AppLog.logForcefully("inside useEffect()");
    handleLoadChatsApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);*/

  const openChatThread = (item: ChatItem) => {
    navigation.navigate("ChatThread", { title: item.name });
  };

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
      <ChatListScreen data={chats} onItemClick={openChatThread} />
    </ProgressErrorView>
  );
};
