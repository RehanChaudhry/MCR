import React from "react";
import HomeController from "ui/screens/home/HomeController";
import { HomeStack } from "./HomeStack";

export const HomeRoutes = () => {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen name="Home" component={HomeController} />
    </HomeStack.Navigator>
  );
};
