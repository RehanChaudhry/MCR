import React, { FC } from "react";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import FriendsController from "ui/screens/home/friends/FriendsController";
import MyFriendsProvider from "ui/screens/home/friends/MyFriendsProvider";
import ConnectionRequestRoutes from "./ConnectionRequestRoutes";
import { FriendsRootStack } from "./FriendsRootStack";

type Props = {};

const FriendsRootRoutes: FC<Props> = () => {
  return (
    <MyFriendsProvider>
      <FriendsRootStack.Navigator
        mode="modal"
        screenOptions={{ headerShown: false }}>
        <FriendsRootStack.Screen
          name="Root"
          component={FriendsController}
        />
        <FriendsRootStack.Screen
          name="ConnectRequests"
          component={ConnectionRequestRoutes}
        />

        <FriendsRootStack.Screen
          name="AgreementDetails"
          component={AgreementDetailsController}
        />
      </FriendsRootStack.Navigator>
    </MyFriendsProvider>
  );
};

export default FriendsRootRoutes;
