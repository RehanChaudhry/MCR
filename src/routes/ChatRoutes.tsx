import React from "react";
import { ChatListController } from "ui/screens/chat/list/ChatListController";
import { ChatBottomBar } from "routes/ChatBottomBar";

export const ChatRoutes = () => {
  return (
    <ChatBottomBar.Navigator tabBar={() => null}>
      <ChatBottomBar.Screen name="Active" component={ChatListController} />
      <ChatBottomBar.Screen
        name="Archive"
        component={ChatListController}
      />
    </ChatBottomBar.Navigator>
  );
};
