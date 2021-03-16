import { View } from "react-native";
import React from "react";
import { ItemChatThread } from "ui/components/molecules/item_chat/ItemChatThread";

type Props = {};

export const ChatThreadScreen = React.memo<Props>(() => {
  return (
    <View>
      <ItemChatThread />
    </View>
  );
});
