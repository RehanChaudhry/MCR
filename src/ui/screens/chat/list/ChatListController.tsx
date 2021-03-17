import React, { FC, useState } from "react";
import { ChatListScreen } from "ui/screens/chat/list/ChatListScreen";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeDrawerParamList } from "routes";
import { useNavigation } from "@react-navigation/native";
import { ChatsResponseModel } from "models/api_responses/ChatsResponseModel";
import { useApi } from "repo/Client";
import ChatApis from "repo/chat/ChatAPis";
import { AppLog } from "utils/Util";
import ChatItem from "models/ChatItem";

type ChatListNavigationProp = StackNavigationProp<
  HomeDrawerParamList,
  "ChatList"
>;

type Props = {};

export const ChatListController: FC<Props> = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = useNavigation<ChatListNavigationProp>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [chats, setChats] = useState<ChatItem[]>([]);

  /*  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Switch Variations"
    });
  }, [navigation]);*/

  const loadChatsApi = useApi<any, ChatsResponseModel>(ChatApis.getChats);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLoadChatsApi = async (onComplete?: () => void) => {
    const { hasError, dataBody, errorBody } = await loadChatsApi.request(
      []
    );
    if (hasError || dataBody === undefined) {
      // Alert.alert("Unable to find questions " + errorBody);
      AppLog.log("Unable to find questions " + errorBody);
      return;
    } else {
      setChats(dataBody.data);
      onComplete?.();
    }
  };

  return <ChatListScreen />;
};
