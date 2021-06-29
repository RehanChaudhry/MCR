import EScreen from "models/enums/EScreen";
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
        initialParams={{
          isFrom: EScreen.HOME
        }}
      />
      <FriendsBottomBar.Screen
        name="MyRoommates"
        component={MyRoommatesController}
        initialParams={{
          isFrom: EScreen.HOME
        }}
      />
      <FriendsBottomBar.Screen
        name="RoommateAgreement"
        component={RoommateAgreementController}
        initialParams={{
          isFrom: EScreen.HOME
        }}
      />
      <FriendsBottomBar.Screen
        name="DismissedOrBlocked"
        component={DismissedOrBlockedController}
        initialParams={{
          isFrom: EScreen.HOME
        }}
      />
    </FriendsBottomBar.Navigator>
  );
};
