import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import NotificationController from "ui/screens/home/notification/NotificationController";
import { NotificationStack } from "routes/NotificationParams";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import EScreen from "models/enums/EScreen";
import ConnectRequestsController from "ui/screens/home/friends/connect_requests/ConnectRequestsController";

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
        initialParams={{ isFrom: EScreen.HOME, updateProfile: false }}
        options={{ title: "View Profile" }}
      />
      <NotificationStack.Screen
        name="ConnectRequest"
        component={ConnectRequestsController}
      />
    </Stack.Navigator>
  );
};
