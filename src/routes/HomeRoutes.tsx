import React from "react";
import HomeController from "ui/screens/home/HomeController";
import { HomeStack } from "./HomeStack";
import QuestionsController from "ui/screens/questions/QuestionsController";

export const HomeRoutes = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeController} />
      <HomeStack.Screen name="Questions" component={QuestionsController} />
    </HomeStack.Navigator>
  );
};
