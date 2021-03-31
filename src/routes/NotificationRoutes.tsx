import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotificationController from "ui/screens/home/notification/NotificationController";
import { NotificationStack } from "routes/NotificationParams";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";

const Stack = createStackNavigator();

export const NotificationRoutes = () => {
  return (
    <Stack.Navigator>
      <NotificationStack.Screen
        name="Notification"
        component={NotificationController}
      />
      <NotificationStack.Screen
        name="ViewProfile"
        component={ViewProfileController}
      />
    </Stack.Navigator>
  );
};
