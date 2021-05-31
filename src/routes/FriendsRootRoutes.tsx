import React, { FC } from "react";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import FriendsController from "ui/screens/home/friends/FriendsController";
import ConnectionRequestRoutes from "./ConnectionRequestRoutes";
import { FriendsRootStack } from "./FriendsRootStack";

type Props = {};

const FriendsRootRoutes: FC<Props> = () => {
  return (
    <FriendsRootStack.Navigator
      mode="modal"
      screenOptions={{ headerShown: false }}>
      <FriendsRootStack.Screen name="Root" component={FriendsController} />
      <FriendsRootStack.Screen
        name="ConnectRequests"
        component={ConnectionRequestRoutes}
      />

      <FriendsRootStack.Screen
        name="AgreementDetails"
        component={AgreementDetailsController}
      />
    </FriendsRootStack.Navigator>
  );
};

export default FriendsRootRoutes;
