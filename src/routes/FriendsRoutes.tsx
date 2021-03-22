import React from "react";
import DismissedOrBlockedController from "ui/screens/home/friends/DismissedOrBlocked/DismissedOrBlockedController";
import MyFriendsController from "ui/screens/home/friends/MyFriends/MyFriendsController";
import MyRoommatesController from "ui/screens/home/friends/MyRoommates/MyRoommatesController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import { FriendsBottomBar } from "./FriendsBottomBar";

export const FriendsRoutes = () => {
  return (
    <FriendsBottomBar.Navigator tabBar={() => null}>
      <FriendsBottomBar.Screen
        name="MyFriends"
        component={MyFriendsController}
      />
      <FriendsBottomBar.Screen
        name="MyRoommates"
        component={MyRoommatesController}
      />
      <FriendsBottomBar.Screen
        name="RoommateAgreement"
        component={RoommateAgreementController}
      />
      <FriendsBottomBar.Screen
        name="DismissedOrBlocked"
        component={DismissedOrBlockedController}
      />
    </FriendsBottomBar.Navigator>
  );
};
