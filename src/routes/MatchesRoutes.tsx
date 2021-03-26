import React from "react";
import { MatchesStack } from "routes/MatchesStack";
import MatchesController from "ui/screens/home/matches/MatchesController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { STRINGS } from "config";

const MatchesRoutes = () => {
  return (
    <MatchesStack.Navigator
      initialRouteName={"Matches"}
      screenOptions={{ headerTitleAlign: "center" }}>
      <MatchesStack.Screen
        name="Matches"
        component={MatchesController}
        options={{
          headerLeft: () => <Hamburger />
        }}
      />
      <MatchesStack.Screen
        name="MatchInfo"
        component={MatchInfoController}
        options={{
          title: STRINGS.matchInfo.title
        }}
      />
    </MatchesStack.Navigator>
  );
};

export default MatchesRoutes;
