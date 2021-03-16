import React from "react";
import HomeController from "ui/screens/home/HomeController";
import { HomeStack } from "./HomeStack";
import QuestionsController from "ui/screens/questions/QuestionsController";
import NotificationController from "ui/screens/home/notification/NotificationController";

export const HomeRoutes = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeController} />
      <HomeStack.Screen name="Questions" component={QuestionsController} />
      <HomeStack.Screen
        name="Notification"
        component={NotificationController}
      />
    </HomeStack.Navigator>
  );
};
