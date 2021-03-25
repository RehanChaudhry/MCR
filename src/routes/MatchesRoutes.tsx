import React from "react";
import { MatchesStack } from "routes/MatchesStack";
import MatchesController from "ui/screens/home/matches/MatchesController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";

const MatchesRoutes = () => {
  return (
    <MatchesStack.Navigator initialRouteName={"Matches"}>
      <MatchesStack.Screen name="Matches" component={MatchesController} />
      <MatchesStack.Screen
        name="MatchInfo"
        component={MatchInfoController}
      />
    </MatchesStack.Navigator>
  );
};

export default MatchesRoutes;
