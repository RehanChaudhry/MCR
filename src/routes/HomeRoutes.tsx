import React from "react";
import CommunityController from "ui/screens/home/community/CommunityController";
import { HomeDrawer } from "routes/HomeDrawer";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator initialRouteName="Matches">
      <HomeDrawer.Screen name="Matches" component={CommunityController} />
      <HomeDrawer.Screen
        name="Community"
        component={CommunityController}
      />
    </HomeDrawer.Navigator>
  );
};
