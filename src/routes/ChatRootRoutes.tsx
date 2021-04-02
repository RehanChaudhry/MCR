import React, { FC } from "react";
import { ChatRootStack } from "./ChatRootStack";
import ChatController from "ui/screens/chat/ChatController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import { NewConversationController } from "ui/screens/chat/new/NewConversationController";

type Props = {};

const ChatRootRoutes: FC<Props> = () => {
  return (
    <ChatRootStack.Navigator
      mode={"modal"}
      screenOptions={{ headerTitleAlign: "center" }}>
      <ChatRootStack.Screen name={"Root"} component={ChatController} />
      <ChatRootStack.Screen
        name={"NewConversation"}
        component={NewConversationController}
      />
      <ChatRootStack.Screen
        name={"ChatThread"}
        component={ChatThreadController}
      />
    </ChatRootStack.Navigator>
  );
};

export default ChatRootRoutes;
