import React, { FC } from "react";
import { WelcomeStack } from "routes/WelcomeStack";
import WelcomeController from "ui/screens/home/welcome/WelcomeController";
import QuestionsController from "ui/screens/questions/QuestionsController";
import { HeaderTitle } from "ui/components/molecules/header_title/HeaderTitle";
import { STRINGS } from "config";
import { HomeStackRoutesContainer } from "routes/HomeStackRoutesContainer";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import { AddInterestsController } from "ui/screens/home/profile/update_profile/add_interests/AddInterestsController";
import { AuthRoutes } from "routes/AuthRoutes";
import EScreen from "models/enums/EScreen";

export type WelcomeScreens = "Welcome" | "UpdateProfile" | "Questionnaire";

type Props = {
  initialRouteName: WelcomeScreens;
};

export const WelcomeRoutes: FC<Props> = ({
  initialRouteName = "Welcome"
}) => {
  return (
    <WelcomeStack.Navigator initialRouteName={initialRouteName}>
      <WelcomeStack.Screen name="Welcome" component={WelcomeController} />
      <WelcomeStack.Screen
        name="UpdateProfile"
        component={UpdateProfileController}
        options={{ title: "Update Profile" }}
        initialParams={{ isFrom: EScreen.WELCOME, updateProfile: true }}
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
        initialParams={{ isFrom: EScreen.WELCOME }}
      />
      <WelcomeStack.Screen
        name="Matches"
        component={HomeStackRoutesContainer}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="AddInterests"
        component={AddInterestsController}
      />
      <WelcomeStack.Screen
        name="Auth"
        component={AuthRoutes}
        options={{
          headerShown: false
        }}
      />
    </WelcomeStack.Navigator>
  );
};
