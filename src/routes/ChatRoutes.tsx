import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeDrawer } from "routes/HomeDrawer";
import { ChatStack } from "routes/ChatStack";
import { ChatListController } from "ui/screens/chat/list/ChatListController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import { NewConversationController } from "ui/screens/chat/new/NewConversationController";

const Stack = createStackNavigator();

export const ChatRoutes = () => {
  return (
    <Stack.Navigator>
      <HomeDrawer.Screen name="ChatList" component={ChatListController} />
      <ChatStack.Screen
        name="ChatThread"
        component={ChatThreadController}
      />
      <ChatStack.Screen
        name="NewConversation"
        component={NewConversationController}
      />
    </Stack.Navigator>
  );
};
