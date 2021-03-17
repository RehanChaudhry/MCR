import React from "react";
import CommunityController from "ui/screens/home/community/CommunityController";
import { HomeDrawer } from "routes/HomeDrawer";
import MatchesController from "ui/screens/home/matches/MatchesController";
import ProfileController from "ui/screens/home/profile/ProfileController";
import { ChatListController } from "ui/screens/chat/list/ChatLIstController";

export const HomeRoutes = () => {
  return (
    <HomeDrawer.Navigator initialRouteName="Matches">
      <HomeDrawer.Screen name="Matches" component={MatchesController} />
      <HomeDrawer.Screen
        name="Community"
        component={CommunityController}
      />
      <HomeDrawer.Screen name="Profile" component={ProfileController} />
      <HomeDrawer.Screen name="ChatList" component={ChatListController} />
    </HomeDrawer.Navigator>
  );
};
