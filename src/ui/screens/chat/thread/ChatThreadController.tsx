import React, { FC, useLayoutEffect } from "react";
import { ChatThreadScreen } from "ui/screens/chat/thread/ChatThreadScreen";
import { ChatParamsLIst } from "routes/ChatParams";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

type ChatListNavigationProp = StackNavigationProp<
  ChatParamsLIst,
  "ChatThread"
>;

type Props = {};

export const ChatThreadController: FC<Props> = () => {
  const navigation = useNavigation<ChatListNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleAlign: "center",
      title: "Allan & 2 more"
    });
  }, [navigation]);

  return <ChatThreadScreen />;
};
