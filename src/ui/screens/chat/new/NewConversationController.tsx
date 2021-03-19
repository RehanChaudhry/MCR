import React, { FC, useLayoutEffect } from "react";
import { ChatParamsLIst } from "routes/ChatStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useApi } from "repo/Client";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import ChatApis from "repo/chat/ChatAPis";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";

type conversationNavigationProp = StackNavigationProp<
  ChatParamsLIst,
  "NewConversation"
>;

type Props = {};

export const NewConversationController: FC<Props> = () => {
  const navigation = useNavigation<conversationNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Chat"
    });
  }, [navigation]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  /*  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      AppLog.logForcefully("Unable to find chats " + errorBody);
      return;
    } else {
      AppLog.logForcefully("Find chats" + errorBody);
      onComplete?.();
    }
  };*/

  return <NewConversationScreen />;
};
