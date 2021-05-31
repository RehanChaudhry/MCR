import { useRoute } from "@react-navigation/native";
import React from "react";
import { MatchesStack } from "routes/MatchesStack";
import MatchesController from "ui/screens/home/matches/MatchesController";
import MatchInfoController from "ui/screens/home/matches/match_info/MatchInfoController";
import Hamburger from "ui/components/molecules/hamburger/Hamburger";
import { FONT_SIZE, STRINGS } from "config";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { ChatThreadController } from "ui/screens/chat/thread/ChatThreadController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import RoommateAgreementController from "ui/screens/home/friends/RoommateAgreement/RoommateAgreementController";
import QuestionsController from "ui/screens/questions/QuestionsController";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import AgreementDetailsController from "ui/screens/home/friends/agreement_details/AgreementDetailsController";
import EScreen from "models/enums/EScreen";
import {ViewProfileStack} from "routes/ProfileStack";

const MatchesRoutes = ({ navigation }: any) => {
  const route: any = useRoute();

  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      route.params.changeSelectedDrawerItem();
    });

    return unsubscribe;
  }, [navigation, route]);

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
        initialParams={{ isFrom: EScreen.HOME, updateProfile: false }}
        options={{ title: "View Profile" }}
      />
      <MatchesStack.Screen
        name="RoommateAgreement"
        component={RoommateAgreementController}
        options={{
          headerTitle: () => (
            <HeaderTitle
              text={"Roommate Agreement"}
              labelStyle={{ fontSize: FONT_SIZE.xs }}
            />
          )
        }}
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

      <MatchesStack.Screen
        name="AgreementDetails"
        component={AgreementDetailsController}
      />
    </MatchesStack.Navigator>
  );
};

export default MatchesRoutes;
