import { createStackNavigator } from "@react-navigation/stack";
import { HomeDrawer } from "routes/HomeDrawer";
import React from "react";
import NotificationController from "ui/screens/home/notification/NotificationController";

const Stack = createStackNavigator();

export const NotificationRoutes = () => {
  return (
    <Stack.Navigator>
      <HomeDrawer.Screen
        name="Notification"
        component={NotificationController}
      />
    </Stack.Navigator>
  );
};
