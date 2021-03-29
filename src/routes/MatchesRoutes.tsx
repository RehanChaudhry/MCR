import React from "react";
import { MatchesStack } from "routes/MatchesStack";
import MatchesController from "ui/screens/home/matches/MatchesController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { STRINGS } from "config";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import QuestionsController from "ui/screens/questions/QuestionsController";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";

const MatchesRoutes = () => {
  return (
    <MatchesStack.Navigator
      initialRouteName={"Matches"}
      screenOptions={{ headerTitleAlign: "center" }}>
      <MatchesStack.Screen
        name="Matches"
        component={MatchesController}
        options={{
          headerLeft: () => <Hamburger />,
          headerTitle: () => <HeaderTitle text={STRINGS.matches.title} />,
          headerStyle: {
            elevation: 0,
            shadowOpacity: 0
          }
        }}
      />
      <MatchesStack.Screen
        name="MatchInfo"
        component={MatchInfoController}
        options={{
          headerTitle: () => <HeaderTitle text={STRINGS.matchInfo.title} />
        }}
      />
      <MatchesStack.Screen name="Chat" component={ChatThreadController} />
      <MatchesStack.Screen
        name="Profile"
        component={ViewProfileController}
      />
      <MatchesStack.Screen
        name="RoommateAgreement"
        component={RoommateAgreementController}
      />
      <MatchesStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
      />
      <MatchesStack.Screen
        name="Questionnaire"
        component={QuestionsController}
        options={{
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_update} />
          )
        }}
      />
    </MatchesStack.Navigator>
  );
};

export default MatchesRoutes;
