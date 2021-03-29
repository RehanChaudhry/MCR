import React, { FC } from "react";
import FriendRequestsController from "ui/screens/home/friends/friend_requests/FriendRequestsController";
import { ConnectionRequestStack } from "./ConnectionRequestStack";

type Props = {};

const ConnectionRequestRoutes: FC<Props> = () => {
  return (
    <ConnectionRequestStack.Navigator>
      <ConnectionRequestStack.Screen
        name={"FriendRequests"}
        component={FriendRequestsController}
        options={{ title: "Friend Requests" }}
      />
    </ConnectionRequestStack.Navigator>
  );
};

export default ConnectionRequestRoutes;
