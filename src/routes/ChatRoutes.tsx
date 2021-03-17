import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeDrawer } from "routes/HomeDrawer";
import { ChatListController } from "ui/screens/chat/list/ChatListController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";

const Stack = createStackNavigator();

export const ChatRoutes = () => {
  return (
    <Stack.Navigator>
      <HomeDrawer.Screen name="ChatList" component={ChatListController} />
      <HomeDrawer.Screen
        name="ChatThread"
        component={ChatThreadController}
      />
    </Stack.Navigator>
  );
};
