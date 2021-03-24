import React, { FC, useLayoutEffect } from "react";
import { ChatParamsList } from "routes/ChatStack";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { NewConversationScreen } from "ui/screens/chat/new/NewConversationScreen";
import { ConversationItem } from "models/ConversationItem";
import Strings from "config/Strings";

type conversationNavigationProp = StackNavigationProp<
  ChatParamsList,
  "NewConversation"
>;

type Props = {};

const dummyData: ConversationItem[] = [
  {
    id: 1,
    name: "Rose King",
    userId: 1
  },
  {
    id: 2,
    name: "Lian Oneill",
    userId: 2
  }
];

export const NewConversationController: FC<Props> = () => {
  const navigation = useNavigation<conversationNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: Strings.newConversation.title
    });
  }, [navigation]);

  //const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

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

  const removeItemFromList = (
    items: ConversationItem[],
    itemToDelete: ConversationItem
  ) => {
    return items.filter((item) => item.id !== itemToDelete.id);
  };

  return (
    <NewConversationScreen
      data={dummyData}
      removeItem={removeItemFromList}
    />
  );
};
