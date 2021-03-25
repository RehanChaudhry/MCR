import React from "react";
import { MatchesStack } from "routes/MatchesStack";
import MatchesController from "ui/screens/home/matches/MatchesController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";

const MatchesRoutes = () => {
  return (
    <MatchesStack.Navigator initialRouteName={"Matches"}>
      <MatchesStack.Screen
        name="Matches"
        component={MatchesController}
        options={{ headerLeft: () => <Hamburger /> }}
      />
      <MatchesStack.Screen
        name="MatchInfo"
        component={MatchInfoController}
      />
    </MatchesStack.Navigator>
  );
};

export default MatchesRoutes;
