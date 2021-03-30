import { RouteProp, useRoute } from "@react-navigation/native";
import React, { FC } from "react";
import ConnectRequestsController from "ui/screens/home/friends/connect_requests/ConnectRequestsController";
import { ConnectionRequestStack } from "./ConnectionRequestStack";
import { FriendsRootStackParamList } from "./FriendsRootStack";

type Props = {};

type FriendRootRouteProps = RouteProp<
  FriendsRootStackParamList,
  "ConnectRequests"
>;

const ConnectionRequestRoutes: FC<Props> = () => {
  const route = useRoute<FriendRootRouteProps>();
  return (
    <ConnectionRequestStack.Navigator>
      <ConnectionRequestStack.Screen
        name={"FriendRequests"}
        component={ConnectRequestsController}
        initialParams={route.params}
      />
    </ConnectionRequestStack.Navigator>
  );
};

export default ConnectionRequestRoutes;
