import React, { FC } from "react";
import { WelcomeStack } from "routes/WelcomeStack";
import WelcomeController from "ui/screens/home/welcome/WelcomeController";

export const WelcomeRoutes: FC = () => {
  return (
    <WelcomeStack.Navigator initialRouteName={"Welcome"}>
      <WelcomeStack.Screen name="Welcome" component={WelcomeController} />
    </WelcomeStack.Navigator>
  );
};
