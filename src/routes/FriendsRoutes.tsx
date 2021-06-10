import React, { FC } from "react";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import DismissedOrBlockedController from "ui/screens/home/friends/DismissedOrBlocked/DismissedOrBlockedController";
import MyFriendsController from "ui/screens/home/friends/MyFriends/MyFriendsController";
import MyRoommatesController from "ui/screens/home/friends/MyRoommates/MyRoommatesController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import { FriendsBottomBar } from "./FriendsBottomBar";
import {
  DismissedOrBlockStack,
  MyFriendsStack,
  MyRoommatesStack,
  RoommateAgreementStack
} from "./FriendsStack";
import EScreen from "models/enums/EScreen";
import StaticContentController from "ui/screens/static_content/StaticContentController";

export const FriendsRoutes = () => {
  return (
    <FriendsBottomBar.Navigator tabBar={() => null}>
      <FriendsBottomBar.Screen
        name="MyFriends"
        component={MyFriendsRoutes}
      />
      <FriendsBottomBar.Screen
        name="MyRoommates"
        component={MyRoommatesRoutes}
      />
      <FriendsBottomBar.Screen
        name="RoommateAgreement"
        component={RoommateAgreementRoutes}
      />
      <FriendsBottomBar.Screen
        name="DismissedOrBlocked"
        component={DismissedOrBlockedRoutes}
      />
    </FriendsBottomBar.Navigator>
  );
};

type MyFriendsRoutesProps = {};
const MyFriendsRoutes: FC<MyFriendsRoutesProps> = () => {
  return (
    <MyFriendsStack.Navigator>
      <MyFriendsStack.Screen
        name="MyFriends"
        component={MyFriendsController}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="My Friends" />,
          headerLeft: () => <Hamburger />
        }}
      />
    </MyFriendsStack.Navigator>
  );
};

type MyRoommatesRoutesProps = {};
const MyRoommatesRoutes: FC<MyRoommatesRoutesProps> = () => {
  return (
    <MyRoommatesStack.Navigator>
      <MyRoommatesStack.Screen
        name="MyRoommates"
        component={MyRoommatesController}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="My Roommates" />,
          headerLeft: () => <Hamburger />
        }}
      />
    </MyRoommatesStack.Navigator>
  );
};

type RoommateAgreementRoutesProps = {};
const RoommateAgreementRoutes: FC<RoommateAgreementRoutesProps> = () => {
  return (
    <RoommateAgreementStack.Navigator>
      <RoommateAgreementStack.Screen
        initialParams={{ isFrom: EScreen.HOME }}
        name="RoommateAgreement"
        component={RoommateAgreementController}
      />
    </RoommateAgreementStack.Navigator>
  );
};

type DismissedOrBlockedRoutesProps = {};
const DismissedOrBlockedRoutes: FC<DismissedOrBlockedRoutesProps> = () => {
  return (
    <DismissedOrBlockStack.Navigator>
      <DismissedOrBlockStack.Screen
        name="DismissedOrBlocked"
        component={DismissedOrBlockedController}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => <HeaderTitle text="Dismissed or Blocked" />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          },
          headerLeft: () => <Hamburger />
        }}
      />
      <DismissedOrBlockStack.Screen
        name="StaticContent"
        component={StaticContentController}
      />
    </DismissedOrBlockStack.Navigator>
  );
};
