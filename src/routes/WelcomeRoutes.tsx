import React, { FC } from "react";
import { WelcomeStack } from "routes/WelcomeStack";
import WelcomeController from "ui/screens/home/welcome/WelcomeController";
import QuestionsController from "ui/screens/questions/QuestionsController";
import EScreen from "models/enums/EScreen";
import { MatchesStack } from "routes/MatchesStack";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { STRINGS } from "config";

export const WelcomeRoutes: FC = () => {
  return (
    <WelcomeStack.Navigator initialRouteName={"Welcome"}>
      <WelcomeStack.Screen name="Welcome" component={WelcomeController} />
      <MatchesStack.Screen
        name="Questionnaire"
        component={QuestionsController}
        initialParams={{ isFrom: EScreen.WELCOME }}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_create} />
          )
        }}
      />
    </WelcomeStack.Navigator>
  );
};
