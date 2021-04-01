import React, { FC } from "react";
import FriendsController from "ui/screens/home/friends/FriendsController";
import ConnectionRequestRoutes from "./ConnectionRequestRoutes";
import { FriendsRootStack } from "./FriendsRootStack";

type Props = {};

const FriendsRootRoutes: FC<Props> = () => {
  return (
    <FriendsRootStack.Navigator mode={"modal"} headerMode={"none"}>
      <FriendsRootStack.Screen
        name={"Root"}
        component={FriendsController}
      />
      <FriendsRootStack.Screen
        name={"ConnectRequests"}
        component={ConnectionRequestRoutes}
      />
    </FriendsRootStack.Navigator>
  );
};

export default FriendsRootRoutes;
