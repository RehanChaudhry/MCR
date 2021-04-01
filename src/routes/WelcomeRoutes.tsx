import React, { FC } from "react";
import { WelcomeStack } from "routes/WelcomeStack";
import WelcomeController from "ui/screens/home/welcome/WelcomeController";
import QuestionsController from "ui/screens/questions/QuestionsController";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { STRINGS } from "config";
import { HomeRoutes } from "routes/HomeRoutes";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";

export const WelcomeRoutes: FC = () => {
  return (
    <WelcomeStack.Navigator initialRouteName={"Welcome"}>
      <WelcomeStack.Screen name="Welcome" component={WelcomeController} />
      <WelcomeStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
      />
      <WelcomeStack.Screen
        name="Questionnaire"
        component={QuestionsController}
        options={{
          headerTitleAlign: "center",
          headerTitle: () => (
            <HeaderTitle text={STRINGS.questionnaire.title_create} />
          )
        }}
      />

      <WelcomeStack.Screen
        name="Matches"
        component={HomeRoutes}
        options={{ headerShown: false }}
      />
    </WelcomeStack.Navigator>
  );
};
