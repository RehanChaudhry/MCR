import React from "react";
import { ProfileBottomBar } from "routes/ProfileBottomBar";
import UpdateProfileController from "ui/screens/home/profile/update_profile/UpdateProfileController";
import ViewProfileController from "ui/screens/home/profile/view_profile/ViewProfileController";
import QuestionsController from "../ui/screens/questions/QuestionsController";
import { STRINGS } from "config";
import EScreen from "models/enums/EScreen";

export const ProfileRoutes = () => {
  return (
    <ProfileBottomBar.Navigator tabBar={() => null}>
      <ProfileBottomBar.Screen
        name="ViewProfile"
        component={ViewProfileController}
        initialParams={{ isFrom: EScreen.HOME }}
      />
      <ProfileBottomBar.Screen
        name="UpdateProfile"
        initialParams={{
          isFrom: EScreen.HOME
        }}
        component={UpdateProfileController}
        options={{ title: "Update Profile" }}
      />
      <ProfileBottomBar.Screen
        name="UpdateQuestionnaire"
        initialParams={{ isFrom: EScreen.HOME }}
        options={{
          title: STRINGS.questionnaire.title_update
        }}
        component={QuestionsController}
      />
    </ProfileBottomBar.Navigator>
  );
};
