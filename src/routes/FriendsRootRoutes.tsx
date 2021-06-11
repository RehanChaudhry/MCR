import React, { FC } from "react";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import FriendsController from "ui/screens/home/friends/FriendsController";
import ConnectionRequestRoutes from "./ConnectionRequestRoutes";
import { FriendsRootStack } from "./FriendsRootStack";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";

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
      <FriendsRootStack.Screen
        options={{ headerShown: true }}
        name="Profile"
        component={ViewProfileController}
      />
      <FriendsRootStack.Screen
        name="Chat"
        component={ChatThreadController}
        options={{ headerShown: true }}
      />
    </FriendsRootStack.Navigator>
  );
};

export default FriendsRootRoutes;
